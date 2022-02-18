import umzug from './database/umzug';

umzug
  .up()
  .then(() => {
    console.log('All migrations completed successfully.');
  })
  .catch((er) => {
    console.error(er);
    process.exit(1);
  });
