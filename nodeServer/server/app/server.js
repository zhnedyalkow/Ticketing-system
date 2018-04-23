const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers',
//         'Content-Type');
//     next();
//     return;
// });

const data = require('./data/data');

const config = require('./config');

require('./config/express').init(app);
require('./config/auth').init(app, data);

require('./routes').init(app, data);

app.listen(config.port);
console.log(`App running at port: ${config.port}`);
