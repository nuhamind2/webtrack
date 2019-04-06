'use strict';
const Path = require('path');
const Inert = require('inert');
const Hapi = require('hapi');

const server = Hapi.server({
    port: 10003,
    host: 'localhost',
    routes: {
        cors: true
    }
});

const provision = async () => {

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return h.redirect("https://dash.gpsinstant.id")
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();