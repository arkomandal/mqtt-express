require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./events');
require('./mqtt-broker');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use('/mqtt', require('./controllers/mqtt.route'));

app.listen(process.env.PORT, () => console.log("\x1b[33m%s\x1b[0m", `express server is listening on port ${process.env.PORT}`));