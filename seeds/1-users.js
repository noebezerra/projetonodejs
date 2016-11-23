const bcrypt = require('bcrypt-nodejs');

const pass = bcrypt.hashSync(123);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    // Inserts seed entries
    knex('users').insert({id: 1, email: 'admin@admin.com', password: pass, is_admin: 1}),
    knex('users').insert({id: 2, email: 'user@user.com', password: pass, is_admin: 0 })
  ]);
};
