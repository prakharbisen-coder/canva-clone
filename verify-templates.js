require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

sql('SELECT id, name, "thumbnailUrl", width, height, "isTemplate", "isPro" FROM "project" WHERE "isTemplate" = true ORDER BY "isPro" ASC, name ASC')
  .then(results => {
    console.log(`\n📊 Templates in database: ${results.length}\n`);
    results.forEach(t => {
      console.log(`✓ ${t.name}`);
      console.log(`  Image: ${t.thumbnailUrl}`);
      console.log(`  Size: ${t.width}x${t.height}`);
      console.log(`  Type: ${t.isPro ? '👑 PRO' : '🆓 FREE'}`);
      console.log('');
    });
    process.exit(0);
  })
  .catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
