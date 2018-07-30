var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
 res.render('main');
 console.log('main page rendering');
});

module.exports = router;
