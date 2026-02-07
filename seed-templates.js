require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');
const crypto = require('crypto');

let connection;

async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
  }
  return connection;
}

// Sample template data based on the JSON files in public folder
const templates = [
  {
    name: 'Flash Sale',
    json: JSON.stringify(require('./public/flash_sale.json')),
    width: 900,
    height: 1200,
    thumbnailUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&h=1200&fit=crop',
    isTemplate: true,
    isPro: false,
    userId: null
  },
  {
    name: 'Travel Adventure',
    json: JSON.stringify(require('./public/travel.json')),
    width: 1080,
    height: 1080,
    thumbnailUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1080&h=1080&fit=crop',
    isTemplate: true,
    isPro: false,
    userId: null
  },
  {
    name: 'Car Sale Promo',
    json: JSON.stringify(require('./public/car_sale.json')),
    width: 1200,
    height: 630,
    thumbnailUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=630&fit=crop',
    isTemplate: true,
    isPro: false,
    userId: null
  },
  {
    name: 'Coming Soon',
    json: JSON.stringify(require('./public/coming_soon.json')),
    width: 1080,
    height: 1350,
    thumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1080&h=1350&fit=crop',
    isTemplate: true,
    isPro: false,
    userId: null
  }
];

async function seedTemplates() {
  const conn = await getConnection();
  
  try {
    console.log('Seeding templates...');
    
    // Use default user ID since auth is disabled
    const userId = '65035357-b8dc-4207-90bb-80a027162d32';
    
    // First, check if user exists, create if not
    const [userRows] = await conn.query('SELECT id FROM user WHERE id = ?', [userId]);
    
    if (userRows.length === 0) {
      console.log('Creating default user...');
      await conn.query(
        'INSERT INTO user (id, name, email, emailVerified, image, password) VALUES (?, ?, ?, NULL, NULL, NULL)',
        [userId, 'Guest User', 'guest@example.com']
      );
      console.log('✓ Default user created');
    }
    
    // Check if templates already exist
    const [existingTemplates] = await conn.query('SELECT COUNT(*) as count FROM project WHERE isTemplate = true');
    
    if (existingTemplates[0].count > 0) {
      console.log(`Found ${existingTemplates[0].count} existing templates. Deleting them first...`);
      await conn.query('DELETE FROM project WHERE isTemplate = true');
      console.log('✓ Deleted existing templates');
    }
    
    console.log(`Using user ID: ${userId}`);
    
    for (const template of templates) {
      const id = crypto.randomUUID();
      const now = new Date();
      
      await conn.query(
        'INSERT INTO project (id, name, json, width, height, thumbnailUrl, isTemplate, isPro, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, template.name, template.json, template.width, template.height, template.thumbnailUrl, template.isTemplate, template.isPro, userId, now, now]
      );
      console.log(`✓ Created template: ${template.name} (${id})`);
    }
    
    console.log('\n✅ All templates seeded successfully!');
    console.log(`\nTotal templates in database: ${templates.length}`);
    
    await conn.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding templates:', error.message);
    console.error(error);
    process.exit(1);
  }
}

seedTemplates();
