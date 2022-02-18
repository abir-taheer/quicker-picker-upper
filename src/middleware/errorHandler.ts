import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  res.json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: 'There was an unexpected error. Try again later.',
    },
  });
};

export default errorHandler;
