const express = require('express');
const app = express();

const logger = require('./middleware/logger');
app.use(logger);

const session = require('./middleware/session');
app.use(session);

const parsers = require('./middleware/parsers');
app.use(parsers);

const opengraph = require('./opengraph');
app.use(opengraph);

// ROUTES
app.use('/', require('./routes'));

module.exports = app;
