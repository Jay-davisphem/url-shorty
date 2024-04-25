import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import urlRouter from './apis/index.js'
import { readFileSync } from 'fs';
import swaggerUi from "swagger-ui-express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Define the middleware function
const logEnvironment = () => {
  let mode = 'dev'
  if (process.env.env === 'production') mode = 'combined'
  return logger(mode)
}

// Use the middleware function
app.use(logEnvironment());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get(
  '/api/docs/swagger.yaml',
  (req, res) => {
    const swaggerFile = readFileSync("./public/swagger.yaml", "utf8");
    res.setHeader("Content-Type", "text/yaml");
    res.send(swaggerFile);
  },
);

//--- Serving swaggerPath
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(
    {},
    {
      swaggerOptions: {
        url: `/api/docs/swagger.yaml`,
      },
    },
  ),
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', urlRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  console.log('Views directory:', req.app.get('views'));
  console.log('Environment:', req.app.get('env'));

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app