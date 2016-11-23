
exports.up = function(knex, Promise) {
  return knex.raw(`
    CREATE TABLE users (
    	id serial,
    	email varchar(140) DEFAULT NULL,
    	password varchar(255) DEFAULT NULL,
    	nome varchar(100) DEFAULT NULL,
    	cpf bigint DEFAULT NULL,
    	rg bigint DEFAULT NULL,
    	cod_integracao varchar(10) DEFAULT NULL,
    	dta_nasc date DEFAULT NULL,
    	loja varchar(100),
    	situacao varchar(100),
    	is_admin int DEFAULT 0,
    	PRIMARY KEY (id)
    )
  `)
};

exports.down = function(knex, Promise) {
  return knex.shema.dropTable('users');
};
