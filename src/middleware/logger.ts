import morgan from 'morgan';

const logger = morgan(process.env.MORGAN_FORMAT || 'dev', {
  skip: (req, res) =>
    res.statusCode < 400 && process.env.NODE_ENV === 'production',
});

export default logger;
