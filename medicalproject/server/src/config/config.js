const path = require('path')

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'qlhsba',
        user: process.env.DB_USER || 'qlhsba',
        password: process.env.DB_PASS || 'qlhsba',
        options: {
          dialect: process.env.DIALECT || 'sqlite',
          host: process.env.HOST || 'localhost',
          storage: path.resolve(__dirname, '../../qlhsba.sqlite')
        }
      },
      authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
      }
}