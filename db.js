const knex = require('knex');

// connection database
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: '5432',
    user: 'postgres',
    password: 'root',
    database: 'test',
  }
});

module.exports = db;
