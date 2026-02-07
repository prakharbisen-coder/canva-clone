require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function testConnection() {
  let connection;
  
  try {
    console.log('\n🔌 Testing MySQL connection...');
    console.log('Database URL:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
    
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('✅ Connected to MySQL successfully!\n');
    
    // Test 1: Check database
    const [dbResult] = await connection.query('SELECT DATABASE() as db');
    console.log('📊 Current Database:', dbResult[0].db);
    
    // Test 2: List tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log('\n📋 Tables in database:');
    tables.forEach(table => {
      console.log('  -', Object.values(table)[0]);
    });
    
    // Test 3: Count users
    const [userCount] = await connection.query('SELECT COUNT(*) as count FROM user');
    console.log('\n👥 Users:', userCount[0].count);
    
    // Test 4: Count templates
    const [templateCount] = await connection.query('SELECT COUNT(*) as count FROM project WHERE isTemplate = true');
    console.log('📄 Templates:', templateCount[0].count);
    
    // Test 5: List templates
    const [templates] = await connection.query('SELECT id, name, isTemplate, isPro FROM project WHERE isTemplate = true LIMIT 5');
    console.log('\n📝 Template List:');
    templates.forEach(t => {
      console.log(`  - ${t.name} (isPro: ${t.isPro}, isTemplate: ${t.isTemplate})`);
    });
    
    // Test 6: Count all projects
    const [projectCount] = await connection.query('SELECT COUNT(*) as count FROM project');
    console.log('\n📁 Total Projects:', projectCount[0].count);
    
    console.log('\n✅ All database tests passed!\n');
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database connection failed!');
    console.error('Error:', error.message);
    console.error('\nFull error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

testConnection();
