import setupApp from '../app';
import { Server } from 'http';

describe('App', async function () {
  const app = await setupApp();

  describe('#listen', function () {
    it('should run a server without error', (done) => {
      let server: Server;
      try {
        server = app.listen(process.env.PORT || 3001);
        done();
      } finally {
        server.close();
      }
    });
  });
});
