const knex = require('knex');

// connection database
const config = require('./knexfile')[process.env.NODE_ENV || 'development'];
const db = knex(config);

module.exports = db;
