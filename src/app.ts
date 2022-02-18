import express from 'express';
import umzug from './database/umzug';
import errorHandler from './middleware/errorHandler';
import logger from './middleware/logger';
import parsers from './middleware/parsers';

const app = express();

const apolloServer = require('./graphql');

async function setupApp() {
  await umzug.up();

  app.use(logger);

  app.use(parsers);

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: '/graphql', cors: false });

  app.use(errorHandler);

  return app;
}

export default setupApp;
