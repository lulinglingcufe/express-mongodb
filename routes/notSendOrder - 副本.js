var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.session.user;
  if(user && user.username){
	
	//Model.Buy.find({"content":"文字1"}, function(err, docs){
	//把所有此用户的订单列出
    Model.Buy.find({"username":user.username,is_send:"no"}, function(err, docs){
      if(err){
        console.log(err);
        return;
      }else{
        
		res.render('notSendOrder',{user: user, items: docs});
		
        return;
      }
    })
  
  }else{
    res.redirect('/loginTest');
    return;
  }
});

module.exports = router;
