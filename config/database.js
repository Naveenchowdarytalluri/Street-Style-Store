const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://naveen_database_user:HJ6cV44ALsCTpWGr8Hdfj1STv1EJKW2s@dpg-cujeb2jv2p9s73fvnbng-a/naveen_database',
  ssl: {
    rejectUnauthorized: false, // For cloud-hosted PostgreSQL databases
  },
});

module.exports = pool;
