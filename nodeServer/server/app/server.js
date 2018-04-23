const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());

const data = require('./data/data');

const config = require('./config');

require('./config/express').init(app);
require('./config/auth').init(app, data);

require('./routes').init(app, data);

app.listen(config.port);
console.log(`App running at port: ${config.port}`);
