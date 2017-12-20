var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/adminUpdate', function(req, res, next) {
  var user = req.session.user;
  if(user && user.username){
    var _id = req.query._id;
    Model.Recevier.findOne({_id: _id}, function(err, doc){
      if(err){
        console.log(err);
        return;
      }else{
        res.render('adminUpdate', {user: user, item: doc});
        return;
      }
    })
  }else{
    res.redirect('/loginTest');
    return;
  }
});

router.post('/adminUpdate', function(req, res, next){
  var Id = req.body.Id;
  var newRecevier = {
    recevierName : req.body.recevierName,
    recevierPhone : req.body.recevierPhone,
    recevierAddress : req.body.recevierAddress
  };

  Model.Recevier.update({_id: Id}, {$set: newRecevier}, function(err,doc){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('修改成功');
      console.log(doc);
      res.redirect('/admin');
    }
  })
  
  
  
})

module.exports = router;
