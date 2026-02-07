import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users, projects } from "../db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "seed-user-template-owner";

const MOCK_JSON = JSON.stringify({
    version: "5.3.0",
    objects: [
        {
            type: "rect",
            left: 100,
            top: 100,
            width: 200,
            height: 200,
            fill: "#3b82f6",
        },
        {
            type: "text",
            left: 120,
            top: 120,
            text: "Template",
            fontSize: 24,
            fill: "white",
        }
    ],
});

async function main() {
    console.log("🌱 Seeding database...");

    // 1. Ensure seed user exists
    const existingUser = await db.select().from(users).where(eq(users.id, SEED_USER_ID));

    if (existingUser.length === 0) {
        console.log("Creating seed user...");
        await db.insert(users).values({
            id: SEED_USER_ID,
            name: "Template Producer",
            email: "templates@canvas.com",
            password: "hashed_dummy_password",
            createdAt: new Date(),
        });
    }

    // 2. Insert Templates
    const templates = [
        {
            name: "Modern Presentation",
            json: MOCK_JSON,
            width: 1920,
            height: 1080,
            isTemplate: true,
            isPro: false,
        },
        {
            name: "Social Media Post",
            json: MOCK_JSON,
            width: 1080,
            height: 1080,
            isTemplate: true,
            isPro: false,
        },
        {
            name: "Business Card",
            json: MOCK_JSON,
            width: 350,
            height: 200,
            isTemplate: true,
            isPro: true,
        },
        {
            name: "YouTube Thumbnail",
            json: MOCK_JSON,
            width: 1280,
            height: 720,
            isTemplate: true,
            isPro: false,
        },
    ];

    console.log("Inserting templates...");
    for (const template of templates) {
        await db.insert(projects).values({
            ...template,
            userId: SEED_USER_ID,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    console.log("✅ Seeding complete!");
}

main().catch((err) => {
    console.error("Error seeding:", err);
    process.exit(1);
});
