require('dotenv').config();

const knex = {
    client: 'mysql',
    connection: {
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DB,
        user: process.env.USER,
        password: process.env.PASS
    }
};

module.exports = knex;