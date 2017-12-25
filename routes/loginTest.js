var express = require('express');
var router = express.Router();
var Model = require('../data/module');
var sha1 = require('sha1');


/* GET home page. */
router.get('/loginTest', function(req, res, next) {
  res.render('loginTest', { title: 'Express' });
});



router.post('/loginTestsignIn', function(req, res, next){
  var userName = req.body.userName;
  var passWord = req.body.passWord;

  if(!userName || !passWord){
		res.send("账户或密码不能为空！");
		return;
	}
	

  
  Model.User.findOne({username: userName}, function(err, doc){
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
      console.log('登录成功');
      req.session.user = {useraccount: doc.useraccount,username: userName};
      //
      return;
    }
    res.send('用户名或者密码错误');
    return;
  })
  
  	
	//将“该“用户的默认收件人信息存储在session里面
    Model.Recevier.findOne({author: userName,AddressStatus:"默认地址"}, function(err, doc){
      if(err){
        console.log(err);
        return;
      }else{
		  if(doc){
			  req.session.userRecevier = {recevierName: doc.recevierName,recevierPhone: doc.recevierPhone,recevierAddress:doc.recevierAddress};
		  }	
		res.redirect('/adminTest');
		return;
      }
    })  
  
  
})



router.post("/loginTestsignUp",function(req,res,next){
	var Registeruser = req.body.Registeruser;
	var Registerpass = req.body.Registerpass;
	var Registerpass2 = req.body.Registerpass2;
	var Registeraccount = req.body.Registeraccount;

	
  var RecevierName = req.body.recevierName;
  var RecevierPhone = req.body.recevierPhone;
  var RecevierAddress = req.body.recevierAddress;
  
  
	console.log(Registeraccount);
	
	if(!Registeruser || !Registerpass || !Registerpass2 || !Registeraccount){
		res.send("注册信息不能为空！");
		return;
	}
	
	
   if(!RecevierName || !RecevierPhone || !RecevierAddress ){
		res.send("默认联系人信息不能为空！");
		return;
	}
	
	
	if(Registerpass2 !== Registerpass){
    res.send('两次密码不一样');
    return;
	}
	
  if(!(/^1\d{10}$/.test(RecevierPhone))){
	  res.send("手机号码错误！");
	  return;
	  
  }		
	
	  var userData = {
  username: Registeruser,
  password: sha1(Registerpass+"sassdfdsfds"),
  useraccount: Registeraccount
  }
	
  var Author = Registeruser;
  var date = new Date(),
      yy = date.getFullYear(),
      MM = date.getMonth() + 1,
      dd = date.getDate(),
      hh = date.getHours(),
      mm = date.getMinutes(),
      ss = date.getSeconds();

  var newRecevier = new Model.Recevier({
    recevierName: RecevierName,
    author: Author,
	recevierPhone: RecevierPhone,
    date: yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss,
	recevierAddress:RecevierAddress,
	AddressStatus:"默认地址"
  });


	
  Model.User.findOne({username: Registeruser}, function(err, doc){
    if(err){
      console.log(err);
      return;
    }else if(doc){
      res.send('用户名已经存在');
      return;
    }else{	
		
      Model.User.create(userData, function(err, doc){
        if(err){
          console.log(err);
          return;
        }else{
          console.log('创建用户成功');
          
        }
      })
    }
  })
  
 
  newRecevier.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('添加初始默认地址成功');
	  res.redirect('/loginTest');
	  
    }
  })	


 
  

})




module.exports = router;

