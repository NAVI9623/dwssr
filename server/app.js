// var createError = require('http-errors');
import createError from "http-errors";
// var express = require('express');
import express from "express";
// var path = require('path');
import path from "path";
// var cookieParser = require('cookie-parser');
import cookieParser from "cookie-parser";
import morgan from "morgan";
// var logger = require('morgan');
import logger from "./lib/winston.js";
// var hbs = require('hbs');
import hbs from "hbs";

//importamos el helper de Vite
import { registerViteHelper } from "./lib/vite.js";

// var indexRouter = require('./routes/index');
//import indexRouter from './routes/index.js';
// var usersRouter = require('./routes/users');
//import usersRouter from './routes/users.js';
// var authorRouter = require('./routes/author');
//import authorRouter from './routes/author.js';

//  Después — con aliases
import indexRouter from "#routes/index";
import usersRouter from "#routes/users";
import authorRouter from "#routes/author";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//var app = express();
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
//Registrar el HELPER de Vite
registerViteHelper(hbs);

app.use(
  morgan("dev", {
    stream: {
      write: (msg) => logger.info(msg.trim()),
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estaticos de Vite (en producción)

app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/author", authorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, _next) {
  _next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.exports = app;
export default app;
