var express = require('express');
var router = express.Router();
var Model = require('../data/module');

// router.get('/users', function(req, res, next) {
//   var userInfo = req.cookies.userInfo;
//   var page = Number(req.query.page || 1);
//   var limit = 2;
//   var skip = (page-1)*limit;
//   Model.User.find({}).limit(limit).skip(skip).then(function(users){
//     res.render('admin/users',{userInfo: userInfo, users: users,page: page })
//   })
// });

/* GET home page. */
router.get('/test1', function(req, res, next) {

  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 7;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.Buy.count().then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.Buy.find({}).limit(limit).skip(skip).then(function( docs){
      var user = req.session.user;
      res.render('test1', {
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
  
  
  
});


/* GET home page. */
router.get('/getpage', function(req, res, next) {


  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 7;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.Buy.count().then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.Buy.find({}).limit(limit).skip(skip).then(function( docs){
      var user = req.session.user;
      res.render('test1', {
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
  
  
  
});







router.post('/getpage', function(req, res, next){
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
  var limit = 7;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.Buy.count().then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.Buy.find({}).limit(limit).skip(skip).then(function( docs){
      var user = req.session.user;
      res.render('test1', {
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
