var express = require('express');
var router = express.Router();
var Model = require('../data/module');
var sha1 = require('sha1');


/* GET home page. */
router.get('/adminlogin', function(req, res, next) {
  res.render('adminlogin', { title: 'Express' });
});



router.post('/adminloginsignIn', function(req, res, next){
  var userName = req.body.userName;
  var passWord = req.body.passWord;

  if(!userName || !passWord){
		res.send("账户或密码不能为空！");
		return;
	}
	

  
  Model.adminUser.findOne({username: userName}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }
    if(!doc){
      res.send('用户名不存在');
      return;
    }
	//密码加盐
    if(doc.password == sha1(passWord+"sassdfdsfds") ){
      console.log('管理员登录成功');
      req.session.adminuser = {useraccount: doc.useraccount,username: userName};
      res.redirect('/adminMpoint');
      return;
    }
    res.send('用户名或者密码错误');
    return;
  })
  
  
  
})



router.post("/adminloginsignUp",function(req,res,next){
	var Registeruser = req.body.Registeruser;
	var Registerpass = req.body.Registerpass;
	var Registerpass2 = req.body.Registerpass2;
	var Registeraccount = req.body.Registeraccount;


  
	console.log(Registeraccount);
	
	if(!Registeruser || !Registerpass || !Registerpass2 || !Registeraccount ){
		res.send("注册信息不能为空！");
		return;
	}
	

	
	if(Registerpass2 !== Registerpass){
    res.send('两次密码不一样');
    return;
	}


   
   
   var reg2 = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){7,18}/;
   if(!reg2.test(Registerpass)){
        res.send("密码长度应该在7-18位");
		return;
   }
	
  var Author = Registeruser;
  var date = new Date(),
      yy = date.getFullYear(),
      MM = date.getMonth() + 1,
      dd = date.getDate(),
      hh = date.getHours(),
      mm = date.getMinutes(),
      ss = date.getSeconds();

  
  
  var adminuserData = {
  username: Registeruser,
  password: sha1(Registerpass+"sassdfdsfds"),
  useraccount: Registeraccount,
  date: yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
  
  }

	console.log("I am finding!");
  Model.adminUser.findOne(
  
  { $or : [ //多条件，数组
            {username : Registeruser},
            {useraccount : Registeraccount}
        ]}
		
		, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else if(doc){
      res.send('用户名或以太坊账户已经存在');
      return;
    }else{	

	
		
      Model.adminUser.create(adminuserData, function(err, doc){
        if(err){
          console.log(err);
          return;
        }else{
          console.log('创建管理员成功');
		  res.redirect('/adminlogin');
        }
      })	  
	  
    }
  })
  



})




module.exports = router;

