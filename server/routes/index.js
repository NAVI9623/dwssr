// var express = require('express');
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, _next) {
  res.render("index", { title: "Proyecto asombroso", author: "Ivan ignacio" });
});

export default router;
