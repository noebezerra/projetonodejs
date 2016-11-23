
exports.up = function(knex, Promise) {
  return knex.raw(`
    CREATE TABLE tweets (
      id int(11) NOT NULL AUTO_INCREMENT,
      text varchar(255) DEFAULT NULL,
      user_id int(11) NOT NULL,
      PRIMARY KEY (id),
      KEY tweets_ibfk_1 (user_id),
      CONSTRAINT tweets_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  `)
};

exports.down = function(knex, Promise) {
  return knex.shema.dropTable('tweets');
};
