// var express = require('express');
import express from "express";
const router = express.Router();
import logger from "../lib/winston.js";

/* GET home page. */
router.get("/", function (req, res, _next) {
  res.render("index", { title: "Proyecto asombroso", author: "Ivan ignacio" });
});

// Rutas para  pruebas de logs

router.get("/test-logs", (req, res) => {
  logger.debug("Mensaje de depuración");
  logger.info("Mensaje informativo");
  logger.warn("Mensaje de advertencia");
  logger.error("Mensaje de error");
  logger.http("Mensaje de solicitud HTTP");
  res.json({
    message: "Logs generados, revisa la consola y los archivos de log.",
    archivos: [
      "logs/app-readable.log",
      "logs/error.log",
      "logs/app-YYYY-MM-DD.log",
    ],
  });
});

//rutas para pruebas de excption y rejection
if (process.env.NODE_ENV !== "production") {
  router.get("/test-exception", (req, res) => {
    res.json({ message: "Excepción no controlada para pruebas" });
  });

  setTimeout(() => {
    throw new Error("Excepción no controlada después de 5 segundos");
  }, 3000);

  router.get("/test-rejection", (req, res) => {
    res.json({ message: "Rechazo de promesa no controlado para pruebas" });
  });

  setTimeout(() => {
    Promise.reject(
      new Error("Rechazo de promesa no controlado después de 5 segundos"),
    );
  }, 3000);
}

export default router;
