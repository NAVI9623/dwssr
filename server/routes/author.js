// var express = require('express');
// import e from 'express';
import express from "express";
const router = express.Router();

// var Author = require('../models/Author');
// import Author from '../models/Author.js';

/* GET author page. */
router.get("/", function (req, res, _next) {
  res.render("author", {
    title: "Sobre el Autor",
    author: "Ivan ignacio",
    description: "Soy un desarrollador apasionado por la tecnología",
    profileimage: "/images/profile.jpg",
  });
});

export default router;
