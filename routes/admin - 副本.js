var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = req.session.user;
  if(user && user.username){
	
  
	//Model.Article.find({"content":"文字1"}, function(err, docs){\
	//返回“该“用户的收件人信息
    Model.Recevier.find({"author":user.username}, function(err, docs){
      if(err){
        console.log(err);
        return;
      }else{
		  
		res.render('admin',{user: user, items: docs});
        return;
      }
    })
	
  }else{
    res.redirect('/loginTest');
    return;
  }
});

module.exports = router;
