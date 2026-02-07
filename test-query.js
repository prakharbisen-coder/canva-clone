// Test the database query directly
require('dotenv').config({ path: '.env.local' });
const { drizzle } = require('drizzle-orm/mysql2');
const mysql = require('mysql2/promise');
const { mysqlTable, varchar, int, boolean, timestamp, text } = require('drizzle-orm/mysql-core');
const { eq, desc, asc } = require('drizzle-orm');

// Define projects table
const projects = mysqlTable("project", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  json: text("json").notNull(),
  height: int("height").notNull(),
  width: int("width").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  isTemplate: boolean("isTemplate"),
  isPro: boolean("isPro"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

async function testQuery() {
  try {
    console.log('Creating database connection...');
    const poolConnection = mysql.createPool(process.env.DATABASE_URL);
    const db = drizzle(poolConnection);
    
    console.log('Querying templates...');
    const data = await db
      .select()
      .from(projects)
      .where(eq(projects.isTemplate, true))
      .limit(4)
      .offset(0)
      .orderBy(
        asc(projects.isPro),
        desc(projects.updatedAt),
      );
    
    console.log(`\n✅ Query successful! Found ${data.length} templates:\n`);
    data.forEach(t => {
      console.log(`- ${t.name} (isPro: ${t.isPro})`);
    });
    
    await poolConnection.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Query failed:');
    console.error('Error message:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

testQuery();
