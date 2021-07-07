const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: false,
    //error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  sendErrorDev(err, res);
  //   if (process.env.NODE_ENV == 'development') {
  //     sendErrorDev(err, res);
  //   } //else if (process.env.NODE_ENV == 'production') {
  // TODO create error response ffor production
  //}
};
