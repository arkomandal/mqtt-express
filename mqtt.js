require('dotenv').config();
const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_URL, {});
const client_ws = mqtt.connect(process.env.MQTT_WS_URL, {});

module.exports.mqtt = (topic, data) => {
    if (!client.connected) {
        client.on('connect', () => {
            console.log("\x1b[33m%s\x1b[0m", `mqtt: message sent`);
            client.publish(topic, JSON.stringify(data));
        });
    }
    else {
        console.log("\x1b[33m%s\x1b[0m", `mqtt: message sent`);
        client.publish(topic, JSON.stringify(data));
    }
    if (!client_ws.connected) {
        client_ws.on('connect', () => {
            console.log("\x1b[33m%s\x1b[0m", `mqtt-ws: message sent`);
            client_ws.publish(topic, JSON.stringify(data));
        });
    }
    else {
        console.log("\x1b[33m%s\x1b[0m", `mqtt-ws: message sent`);
        client_ws.publish(topic, JSON.stringify(data));
    }
}


//receive here (normally in other platform)
const topic = 'localhost/mqtt/send';

client_ws.on('connect', () => {
    client_ws.subscribe(topic, () => {
        client_ws.on('message', (topic, data) => {
            console.log('received message through mqtt-ws:', JSON.parse(data.toString()));
        });
    });
});

client.on('connect', () => {
    client.subscribe(topic, () => {
        client.on('message', (topic, data) => {
            console.log('received message through mqtt:', JSON.parse(data.toString()));
        });
    });
});