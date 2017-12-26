var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/adminMpoint', function(req, res, next) {
	
	
	  var adminuser = req.session.adminuser;
  if(adminuser && adminuser.username){
	
    Model.GivePointRecord.find({_id: {$exists: true}},function(err, docs){
      if(err){
        console.log(err);
        return;
      }else{
		res.render('adminMpoint',{items: docs});		
        return;
      }
    })
	
	
	  }else{
    res.redirect('/adminlogin');
    return;
  }
	
});


router.get('/pointRecordDel', function(req, res, next) {
	  var adminuser = req.session.adminuser;
  if(adminuser && adminuser.username){
	  
    var _id = req.query._id;
    Model.GivePointRecord.remove({_id: _id}, function(err){
      if(err){
        console.log(err);
        return;
      }else{
        console.log('删除积分发放记录'); 
        res.redirect('/adminMpoint');
      }
    })

	
		  }else{
    res.redirect('/adminlogin');
    return;
  }
	
	
});




/* GET users listing. */
router.get('/pointRecordUpdateAndSend', function(req, res, next) {
	  var adminuser = req.session.adminuser;
  if(adminuser && adminuser.username){
	  
    var _id = req.query._id;
    Model.GivePointRecord.findOne({_id: _id}, function(err, doc){
      if(err){
        console.log(err);
        return;
      }else{
        res.render('pointRecordUpdateAndSend', { item: doc});
        return;
      }
    })
	
	
		  }else{
    res.redirect('/adminlogin');
    return;
  }
		
	

});

router.post('/pointRecordUpdateAndSend', function(req, res, next){
  
   var Envent = req.body.envent;
  var Username = req.body.username;
  var Useraccount = req.body.useraccount;
  var Point_type = req.body.point_type;
  var Prize = req.body.prize;
  var Send_adimin = req.body.send_adimin;
  
  
  var date = new Date(),
      yy = date.getFullYear(),
      MM = date.getMonth() + 1,
      dd = date.getDate(),
      hh = date.getHours(),
      mm = date.getMinutes(),
      ss = date.getSeconds();

  var newGivePointRecord = new Model.GivePointRecord({
	  
  envent: Envent,  //事件
  username: Username,   //发放用户名
  useraccount: Useraccount,  //发放账户
  date: yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss,  //发放时间
  prize: Prize,  //发放数量 
  point_type: Point_type,  //发放单位
  send_adimin: Send_adimin  //发放人(默认admin)	  
	
  });
  
  newGivePointRecord.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('成功添加积分发放记录');
    }
  })
 
 res.redirect('/adminMpoint');
  
  
  
})




/* GET users listing. */
router.get('/pointRecordUpdate', function(req, res, next) {
 	  var adminuser = req.session.adminuser;
  if(adminuser && adminuser.username){
	  
    var _id = req.query._id;
    Model.GivePointRecord.findOne({_id: _id}, function(err, doc){
      if(err){
        console.log(err);
        return;
      }else{
        res.render('pointRecordUpdate', { item: doc});
        return;
      }
    })
	
	
			  }else{
    res.redirect('/adminlogin');
    return;
  }
		

});

router.post('/pointRecordUpdate', function(req, res, next){



 var Id = req.body.Id;
   var Envent = req.body.envent;
  var Username = req.body.username;
  var Useraccount = req.body.useraccount;
  var Point_type = req.body.point_type;
  var Prize = req.body.prize;
  var Send_adimin = req.body.send_adimin;  
  var date = new Date(),
      yy = date.getFullYear(),
      MM = date.getMonth() + 1,
      dd = date.getDate(),
      hh = date.getHours(),
      mm = date.getMinutes(),
      ss = date.getSeconds();

  var newGivePointRecord = {
	  
  envent: Envent,  //事件
  username: Username,   //发放用户名
  useraccount: Useraccount,  //发放账户
  date: yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss,  //发放时间
  prize: Prize,  //发放数量 
  point_type: Point_type ,  //发放单位
  send_adimin: Send_adimin  //发放人(默认admin)	  
	
  };
  //发放时间也更新了。
  Model.GivePointRecord.update({_id: Id}, {$set: newGivePointRecord}, function(err,doc){
    if(err){
      console.log(err);
      return;
    }else{
		 console.log(Prize);
      console.log('修改成功');
      console.log(doc);
      res.redirect('/adminMpoint');
    }
  })
  
  
  
})







/* GET users listing. */
router.get('/pointRecordAdd', function(req, res, next) {
	  var adminuser = req.session.adminuser;
  if(adminuser && adminuser.username){
	  
    res.render('pointRecordAdd', {});
	
    return;
	
	
 }else{
    res.redirect('/adminlogin');
    return;
  }
	

});








//插入积分发放记录
router.post('/pointRecordAdd',function(req,res,next){
	
  var Envent = req.body.envent;
  var Username = req.body.username;
  var Useraccount = req.body.useraccount;
  var Point_type = req.body.point_type;
  var Prize = req.body.prize;
  var Send_adimin = req.body.send_adimin;
  
  
  
 	if(!Envent || !Username || !Useraccount ){
		res.send("积分发放记录信息不能为空！");
		return;
	}
	 

  var date = new Date(),
      yy = date.getFullYear(),
      MM = date.getMonth() + 1,
      dd = date.getDate(),
      hh = date.getHours(),
      mm = date.getMinutes(),
      ss = date.getSeconds();

  var newGivePointRecord = new Model.GivePointRecord({
	  
  envent: Envent,  //事件
  username: Username,   //发放用户名
  useraccount: Useraccount,  //发放账户
  date: yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss,  //发放时间
  prize: Prize,  //发放数量 
  point_type: Point_type,  //发放单位
  send_adimin: Send_adimin  //发放人(默认admin)	  
	
  });
  
  
  newGivePointRecord.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('成功添加积分发放记录');
	   res.redirect('/adminMpoint');
    }
  })
 

 
})

module.exports = router;
