var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/test2', function(req, res, next) {
	
	//Model.Buy.find({"content":"文字1"}, function(err, docs){
	//把所有此用户的订单列出
    Model.Buy.find({_id: {$exists: true}},function(err, docs){
      if(err){
        console.log(err);
        return;
      }else{
		res.render('test2',{items: docs});		
        return;
      }
    })
	
	
});


/* GET users listing. */
router.get('/test2Send', function(req, res, next) {

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
	  res.redirect('/test2');
	  return;
      
    }
  })
	
	
});




router.get('/test2Del', function(req, res, next) {

    var _id = req.query._id;
    Model.Buy.remove({_id: _id}, function(err){
      if(err){
        console.log(err);
        return;
      }else{
        console.log('删除订单成功'); //一般来说，这里不应该进行删除操作吧
        res.redirect('/test2');
      }
    })
	
	
	
	
});




module.exports = router;
