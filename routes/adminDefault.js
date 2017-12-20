var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/adminDefault', function(req, res, next) {
  var user = req.session.user;
  var Id = req.query._id;
  var newArticle = {
    AddressStatus : "默认地址",

  };
  
  var newArticle2 = {
    AddressStatus : "可选地址",

  };

  
  /*
	//如果已经是默认地址，则直接返回/admin页面
    Model.Recevier.findOne({author: user.username,AddressStatus:"默认地址",_id: Id}, function(err, doc){
      if(err){
        console.log(err);
        return;
      }else{
		  if(doc){
			  req.session.userRecevier = {recevierName: doc.recevierName,recevierPhone: doc.recevierPhone,recevierAddress:doc.recevierAddress};
			  res.redirect('/admin');
		  }	
		return;
      }
    })  
*/


  
  Model.Recevier.update({author: user.username, AddressStatus:"默认地址"}, {$set: newArticle2}, function(err,doc){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('成功设置为可选地址');
      console.log(doc);
	  return;
    }
  })	  
  
  Model.Recevier.update({_id: Id}, {$set: newArticle}, function(err,doc){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('成功设置为默认地址');
      console.log(doc);
	  return;
      
    }
  })
	//将“该“用户的收件人信息存储在session里面
    Model.Recevier.findOne({_id: Id}, function(err, doc){
      if(err){
        console.log(err);
        return;
      }else{
		req.session.userRecevier = {recevierName: doc.recevierName,recevierPhone: doc.recevierPhone,recevierAddress:doc.recevierAddress};
        res.redirect('/admin');
		return;
      }
    })




  
	
	
});

module.exports = router;
