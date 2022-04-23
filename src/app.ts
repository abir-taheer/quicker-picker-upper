import express from 'express';
import errorHandler from './middleware/errorHandler';
import logger from './middleware/logger';
import parsers from './middleware/parsers';
import apolloServer from "./graphql";

const app = express();


async function setupApp() {
  app.use(logger);

  app.use(parsers);

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: '/graphql', cors: false });

  app.use(errorHandler);

  return app;
}

export default setupApp;
