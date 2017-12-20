var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/OrderSend', function(req, res, next) {
  var user = req.session.user;
  var Id = req.query._id;
  var newArticle = {
    is_send : "yes",

  };
  
  Model.Buy.update({_id: Id}, {$set: newArticle}, function(err,doc){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('成功发货');
      console.log(doc);
	  res.redirect('/sendOrder');
	  return;
      
    }
  })
	
	
});

module.exports = router;
