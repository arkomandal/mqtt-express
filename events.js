const EventEmitter = require('events');
global.eventEmitter = new EventEmitter();
const mqtt = require('./mqtt').mqtt;

global.eventEmitter.on('on_send', async (data) => {
    mqtt(`localhost/mqtt/send`, data);
});