require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

sql('SELECT id, name, thumbnailUrl, isTemplate, isPro FROM projects WHERE isTemplate = true LIMIT 5')
  .then(results => {
    console.log('Templates in database:', results.length);
    console.log(JSON.stringify(results, null, 2));
    process.exit(0);
  })
  .catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
