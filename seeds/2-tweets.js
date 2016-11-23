
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    // Inserts seed entries
    knex('tweets').insert({id: 1, text: 'First Tweet', user_id: 1}),
    knex('tweets').insert({id: 2, text: 'Second Tweet', user_id: 2}),
    knex('tweets').insert({id: 3, text: 'Thirt Tweet', user_id: 2})
  ]);
};
