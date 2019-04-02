const base32 = require('hi-base32');
const crypto = require('crypto');
const Hapi = require('hapi');
var Redis = require('ioredis');
const Boom = require('boom');
var redis = new Redis();
redis.set('foo', 'bar');
redis.get('foo', function (err, result) {
    console.log(result);
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});
server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        await delay(2000)
        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.route({
    method: 'GET',
    path: '/newEventCode',
    handler: async (request, h) => {
        await delay(2000)
        let eventCode = base32.encode(crypto.randomBytes(3)).substring(0,5)
        if(! await redis.sismember("tracker:event",eventCode)){
            await redis.sadd("tracker:event",eventCode)
            return eventCode
            //return Boom.notFound();
        }
        else{
            return Boom.badImplementation()
        }        
    }
});

server.route({
    method: 'GET',
    path: '/checkEventCode/{eventCode}',
    handler: async (request, h) => {

        return redis.sismember("tracker:event",request.params.eventCode)
    }
});

server.route({
    method: 'POST',
    path: '/setAssetInformation',
    handler: async (request, h) => {

        return redis.sismember("tracker:event",request.params.eventCode)
    }
});



const init = async () => {
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
