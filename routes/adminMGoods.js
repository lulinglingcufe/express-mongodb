var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/adminMGoods', function(req, res, next) {
	
	  var adminuser = req.session.adminuser;
  if(adminuser && adminuser.username){
	  
	  
    Model.Buy.find({_id: {$exists: true}},function(err, docs){
      if(err){
        console.log(err);
        return;
      }else{
		res.render('adminMGoods',{items: docs});		
        return;
      }
    })
	
	  }else{
    res.redirect('/adminlogin');
    return;
  }	
	
	
	
});

/* GET users listing. */
router.get('/test2Send', function(req, res, next) {
	  var adminuser = req.session.adminuser;
  if(adminuser && adminuser.username){
	  
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
	  res.redirect('/adminMGoods');
	  return;
      
    }
  })
  
	  }else{
    res.redirect('/adminlogin');
    return;
  }	  
	
	
});




router.get('/test2Del', function(req, res, next) {
	  var adminuser = req.session.adminuser;
  if(adminuser && adminuser.username){
	  
    var _id = req.query._id;
    Model.Buy.remove({_id: _id}, function(err){
      if(err){
        console.log(err);
        return;
      }else{
        console.log('删除订单成功'); //一般来说，这里不应该进行删除操作吧
        res.redirect('/adminMGoods');
      }
    })
	
	  }else{
    res.redirect('/adminlogin');
    return;
  }	  	
	
	
});




module.exports = router;
