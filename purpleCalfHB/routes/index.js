var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', (req, res, next) => {
  res.render('index');
});

router.get('/test/:id', function(req, res, next){
  res.render('test',{output: req.params.id});
});
module.exports = router;
