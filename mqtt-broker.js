require('dotenv').config();
const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = process.env.MQTT_PORT;

server.listen(port, function () {
  console.log("\x1b[33m%s\x1b[0m", `Aedes mqtt server started and listening on port ${port}`);
});

const wsPort = process.env.MQTT_WS_PORT;
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
ws.createServer({ server: httpServer }, aedes.handle);

httpServer.listen(wsPort, function () {
  console.log("\x1b[33m%s\x1b[0m", `Aedes mqtt-ws server started and listening on port ${wsPort}`);
});