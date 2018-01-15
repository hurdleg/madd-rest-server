var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RESTful API Server for Mobile Application Design & Development (MAD&D)' });
});

module.exports = router;
