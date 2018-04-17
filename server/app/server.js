const express = require('express');

const app = express();

const data = require('./data/data');

const config = require('./config');

require('./config/express').init(app);

require('./routes').init(app, data);

app.listen(config.port);
console.log(`App running at port: ${config.port}`);
