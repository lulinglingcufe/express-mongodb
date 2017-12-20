var express = require('express');
var router = express.Router();
var Model = require('../data/module');
// var Article = require('../data/module');

/* GET users listing. */
router.get('/adminAdd', function(req, res, next) {
  var user = req.session.user;
  if(user && user.username){
    res.render('adminAdd', {title: 'Express',user: user});
    return;
  }else{
    res.redirect('/loginTest');
    return;
  }
});

router.post('/adminAdd', function(req, res, next){
  var RecevierName = req.body.recevierName;
  var RecevierPhone = req.body.recevierPhone;
  var RecevierAddress = req.body.recevierAddress;
  var Author = req.body.Author;
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
	AddressStatus:"可选地址"
  });

  newRecevier.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('添加地址成功');
      res.redirect('/admin');
    }
  })
  
  
})

module.exports = router;
