require('dotenv').config();
import cluster, { Worker } from 'cluster';
import setupApp from './app';

const port: number = Number(process.env.PORT) || 3001;

export async function run() {
  const app = await setupApp();

  if (process.env.NODE_ENV === 'production') {
    if (cluster.isPrimary) {
      console.log(
        'Running production server. Now Spawning worker processes...'
      );

      const cpuCount = require('os').cpus().length;

      // Create a worker for each CPU
      for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
      }

      cluster.on('exit', (worker: Worker, code: number) => {
        // Restart the dead process
        console.log(
          `Worker ${worker.id} died with code ${code}. Restarting...`
        );
        cluster.fork();
      });
    } else {
      // Code to run inside of a worker
      app.listen(port, () =>
        console.log(`Worker ${cluster.worker.id} listening on port ${port}`)
      );
    }
  } else {
    // Code to run in a development env
    app.listen(port, () => console.log(`Listening on port ${port}`));
  }
}

run().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
