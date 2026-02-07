const { neon } = require('@neondatabase/serverless');

const sql = neon('postgresql://neondb_owner:npg_HvcYhECg5a4Z@ep-soft-forest-aiye8avr-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');

async function getUserId() {
  try {
    const users = await sql('SELECT id FROM "user" LIMIT 1');
    console.log(users[0]?.id || 'No user found');
  } catch (error) {
    console.error('Error:', error);
  }
}

getUserId();
