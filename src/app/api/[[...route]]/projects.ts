import { z } from "zod";
import { Hono } from "hono";
import { eq, and, desc, asc } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import crypto from "crypto";

import { db } from "@/db/drizzle";
import { projects, projectsInsertSchema } from "@/db/schema";

// Default user ID for unauthenticated access
const DEFAULT_USER_ID = "65035357-b8dc-4207-90bb-80a027162d32";

const app = new Hono()
  .get(
    "/templates",
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (c) => {
      const { page, limit } = c.req.valid("query");

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page -1) * limit)
        .orderBy(
          asc(projects.isPro),
          desc(projects.updatedAt),
        );

      return c.json({ data });
    },
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");

      const existingProject = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, id),
            eq(projects.userId, DEFAULT_USER_ID),
          ),
        );

      if (existingProject.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      await db
        .delete(projects)
        .where(
          and(
            eq(projects.id, id),
            eq(projects.userId, DEFAULT_USER_ID),
          ),
        );

      return c.json({ data: { id } });
    },
  )
  .post(
    "/:id/duplicate",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");

      const data = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, id),
            eq(projects.userId, DEFAULT_USER_ID),
          ),
        );

      if (data.length === 0) {
        return c.json({ error:" Not found" }, 404);
      }

      const project = data[0];

      const duplicateId = crypto.randomUUID();
      await db
        .insert(projects)
        .values({
          id: duplicateId,
          name: `Copy of ${project.name}`,
          json: project.json,
          width: project.width,
          height: project.height,
          userId: DEFAULT_USER_ID,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const duplicateData = await db
        .select()
        .from(projects)
        .where(eq(projects.id, duplicateId));

      return c.json({ data: duplicateData[0] });
    },
  )
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (c) => {
      const { page, limit } = c.req.valid("query");

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, DEFAULT_USER_ID))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return c.json({
        data,
        nextPage: data.length === limit ? page + 1 : null,
      });
    },
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({ id: z.string() }),
    ),
    zValidator(
      "json",
      projectsInsertSchema
        .omit({
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial()
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      await db
        .update(projects)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(projects.id, id),
            eq(projects.userId, DEFAULT_USER_ID),
          ),
        );

      const data = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, id),
            eq(projects.userId, DEFAULT_USER_ID),
          ),
        );

      if (data.length === 0) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      return c.json({ data: data[0] });
    },
  )
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");

      const data = await db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, id),
            eq(projects.userId, DEFAULT_USER_ID)
          )
        );

      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: data[0] });
    },
  )
  .post(
    "/",
    zValidator(
      "json",
      projectsInsertSchema.pick({
        name: true,
        json: true,
        width: true,
        height: true,
      }),
    ),
    async (c) => {
      const { name, json, height, width } = c.req.valid("json");

      const projectId = crypto.randomUUID();
      await db
        .insert(projects)
        .values({
          id: projectId,
          name,
          json,
          width,
          height,
          userId: DEFAULT_USER_ID,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const data = await db
        .select()
        .from(projects)
        .where(eq(projects.id, projectId));

      if (!data[0]) {
        return c.json({ error: "Something went wrong" }, 400);
      }

      return c.json({ data: data[0] });
    },
  );

export default app;
