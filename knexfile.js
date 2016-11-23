module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5432',
      user: 'postgres',
      password: 'root',
      database: 'test',
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: 'production',
      port: '3307',
      user: 'production',
      password: '',
      database: 'test',
    }
  }
}
