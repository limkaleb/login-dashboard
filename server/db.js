const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  pasword: '12345678',
  host: 'localhost',
  port: 5432,
  database: 'users',
});

module.exports = pool;
