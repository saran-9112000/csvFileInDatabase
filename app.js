const { Model} = require('objection')
const Hapi = require('@hapi/hapi');
const knex = require('knex')(require('./src/database/config'))
const route= require('./src/routes/routes')

const init = async () => {
    knex
        .raw('select 1+1 as result')
        .then(_ => {
            console.log("DB connected")
        })
        .catch(e => {
            console.log("Error", e)
            process.exit(1)
        })

        Model.knex(knex)
    const server = Hapi.server({
        port: 4000,
        host: 'localhost'
    });  
    await server.register(require('@hapi/inert'));
    server.route(route)
    await server.start();
    console.log('Server running on %s', server.info.uri);
    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    });
};

init()