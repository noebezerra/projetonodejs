
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.join(
    knex('tweets').del(),
    knex('users').del()
  );
};
