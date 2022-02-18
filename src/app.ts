import express from 'express';
import logger from './middleware/logger';
import parsers from './middleware/parsers';
import errorHandler from './middleware/errorHandler';
import umzug from './database/umzug';

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
