var express = require('express');
var router = express.Router();
var Model = require('../data/module');

/* GET users listing. */
router.get('/OrderDel', function(req, res, next) {
    var user = req.session.user;
    var _id = req.query._id;
	 
	 
	console.log(err);
	
    Model.Buy.remove({_id: _id}, function(err){
      if(err){
        console.log(err);
        return;
      }else{
        console.log('删除订单成功'); //一般来说，这里不应该进行删除操作吧
        res.redirect('/sendOrder');
      }
    })
});

module.exports = router;
