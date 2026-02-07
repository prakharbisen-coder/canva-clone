require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function createTables() {
  let connection;
  
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('✓ Connected to MySQL');
    
    // Read the SQL migration file
    const sqlFile = path.join(__dirname, 'drizzle', '0000_high_hellion.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    // Split by statement-breakpoint and execute each statement
    const statements = sql.split('--> statement-breakpoint').map(s => s.trim()).filter(s => s);
    
    console.log(`Executing ${statements.length} SQL statements...`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        await connection.query(statement);
      }
    }
    
    console.log('\n✅ All tables created successfully!');
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    console.error(error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

createTables();
