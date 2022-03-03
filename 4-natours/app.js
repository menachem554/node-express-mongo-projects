const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((_req, _res, next) => {
//   console.log('Hello from the middleware😛️');
//   next();
// });

app.use((req, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// The API for the tours and users
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (_req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${_req.originalUrl} on this server!`
  // });

  // const err = new Error(`Can't find ${_req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${_req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
