const express = require('express');
const router = express.Router();
const MqttController = require('./mqtt.controller.js');

router.post('/send', MqttController.send);

module.exports = router;