const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const errorResponse = {
    status: 'error',
    message: err.message || 'Bir hata oluştu',
    code: err.statusCode || 500
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(errorResponse.code).json(errorResponse);
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  AppError
}; 