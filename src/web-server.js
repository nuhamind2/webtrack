'use strict';
const Path = require('path');
const Inert = require('inert');
const Hapi = require('hapi');

const server = Hapi.server({
    port: 10001,
    host: 'localhost',
    routes: {
        cors: true,
        files: {
            relativeTo: Path.join(__dirname, 'dist')
        }
    }
});

const provision = async () => {

    await server.register(Inert);
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true,
            }
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();