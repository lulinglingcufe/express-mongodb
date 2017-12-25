var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/notSendOrder', function(req, res, next) {
  var user = req.session.user;
  if(user && user.username){
	
  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 3;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.Buy.count({"username":user.username,is_send:"no"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.Buy.find({"username":user.username,is_send:"no"}).limit(limit).skip(skip).then(function( docs){
      var user = req.session.user;
      res.render('notSendOrder', {
         title: 'Express',
         user: user,
         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit
      });
    })
  });	
		
  
  }else{
    res.redirect('/loginTest');
    return;
  }
});




/* GET home page. */
router.get('/getnotSendOrderpage', function(req, res, next) {
  var user = req.session.user;
  if(user && user.username){

  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 3;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.Buy.count({"username":user.username,is_send:"no"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.Buy.find({"username":user.username,is_send:"no"}).limit(limit).skip(skip).then(function( docs){
      var user = req.session.user;
      res.render('notSendOrder', {
         title: 'Express',
         user: user,
         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit
      });
    })
  });
  
    }else{
    res.redirect('/loginTest');
    return;
  }
  
});



router.post('/getnotSendOrderpage', function(req, res, next){
 
  var user = req.session.user;
  var page = req.body.userName;

    if(!page ){
		res.send("页码不能为空！");
		return;
	}


	if( (page < 1)  || (page > pages) ){
		res.send("页码超出范围！");
		return;
	}




  page = Number(page || 1);   //当前页面，默认1
  var limit = 3;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.Buy.count({"username":user.username,is_send:"no"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.Buy.find({"username":user.username,is_send:"no"}).limit(limit).skip(skip).then(function( docs){
      var user = req.session.user;
      res.render('notSendOrder', {
         title: 'Express',
         user: user,
         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit
      });
    })
  });
   
  
  
})



























module.exports = router;
