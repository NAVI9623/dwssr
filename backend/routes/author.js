var express = require('express');
var router = express.Router();
var Author = require('../models/Author');

/* GET author page. */
router.get('/', function(req, res, next) {
  res.render('author', { title: 'Sobre el Autor', 
    author: 'Ivan ignacio',
    description: 'Soy un desarrollador apasionado por la tecnología',
  profileimage:'/images/profile.jpg' });
    
});

module.exports = router;