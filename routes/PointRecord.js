var express = require('express');
var router = express.Router();
var Web3 = require('web3')
var Model = require('../data/module');


var web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'))
var abi = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "value": "1000000" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_value", "type": "uint256" } ], "name": "burn", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "standard", "outputs": [ { "name": "", "type": "string", "value": "Token 0.1" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "burnFrom", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "A" } ], "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "1000000" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "积分A" }, { "name": "decimalUnits", "type": "uint8", "index": 2, "typeShort": "uint", "bits": "8", "displayName": "decimal Units", "template": "elements_input_uint", "value": "0" }, { "name": "tokenSymbol", "type": "string", "index": 3, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "A" } ], "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Burn", "type": "event" } ]
//积分A
var aAddress = "0xe540a9bb1f33c426c4bb43d84dce2fc5063ed60b"
var a = web3.eth.contract(abi).at(aAddress);
//积分B
var bAddress = "0xdfdf6bc56543b6d30b39e3f7dc53634a002afc52"
var b = web3.eth.contract(abi).at(bAddress);
//积分C
var cAddress = "0xab88b6794cb7db197f1bd0311c893889b9ce4d69"
var c = web3.eth.contract(abi).at(cAddress);









/* GET users listing. */
router.get('/PointRecord', function(req, res, next) {
  var user = req.session.user;
  
  if(user && user.username){
	  
	  
	var account = user.useraccount

	//账户积分余额
    var aBalance = a.balanceOf(account);
    var bBalance = b.balanceOf(account);
    var cBalance = c.balanceOf(account); 	  
	  	  
	  
  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 5;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.GivePointRecord.count({point_type:"A"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.GivePointRecord.find({point_type:"A"}).limit(limit).skip(skip).then(function( docs){

	
      res.render('PointRecord', {
         title: 'Express',

         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit,
		 "username":user.username,"aBalance":aBalance,"bBalance":bBalance,"cBalance":cBalance	 
		 
      });
    })
  });	  

  
  }else{
    res.redirect('/loginTest');
    return;
  }
  
	  
});


/* GET users listing. */
router.get('/PointRecordB', function(req, res, next) {

  var user = req.session.user;
  
  if(user && user.username){
	  
	  
	var account = user.useraccount

	//账户积分余额
    var aBalance = a.balanceOf(account);
    var bBalance = b.balanceOf(account);
    var cBalance = c.balanceOf(account); 	  


	  
  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 5;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.GivePointRecord.count({point_type:"B"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.GivePointRecord.find({point_type:"B"}).limit(limit).skip(skip).then(function( docs){

	
      res.render('PointRecordB', {
         title: 'Express',

         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit,
		 "username":user.username,"aBalance":aBalance,"bBalance":bBalance,"cBalance":cBalance	 
		 
		 
      });
    })
  });	  



  }else{
    res.redirect('/loginTest');
    return;
  }
  
	  
});

/* GET users listing. */
router.get('/PointRecordC', function(req, res, next) {

  var user = req.session.user;
  
  if(user && user.username){
	  
	  
	var account = user.useraccount

	//账户积分余额
    var aBalance = a.balanceOf(account);
    var bBalance = b.balanceOf(account);
    var cBalance = c.balanceOf(account); 	  

	  
  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 5;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.GivePointRecord.count({point_type:"C"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.GivePointRecord.find({point_type:"C"}).limit(limit).skip(skip).then(function( docs){

	
      res.render('PointRecordC', {
         title: 'Express',

         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit,
		 "username":user.username,"aBalance":aBalance,"bBalance":bBalance,"cBalance":cBalance	 
		 
      });
    })
  });	  
	  
  }else{
    res.redirect('/loginTest');
    return;
  }


	  
});






















/* GET home page. */
router.get('/getAPointRecord', function(req, res, next) {

  var user = req.session.user;
  
  if(user && user.username){
	  
	  
	var account = user.useraccount

	//账户积分余额
    var aBalance = a.balanceOf(account);
    var bBalance = b.balanceOf(account);
    var cBalance = c.balanceOf(account); 	

  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 5;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.GivePointRecord.count({point_type:"A"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.GivePointRecord.find({point_type:"A"}).limit(limit).skip(skip).then(function( docs){

	
      res.render('PointRecord', {
         title: 'Express',

         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit,
		 "username":user.username,"aBalance":aBalance,"bBalance":bBalance,"cBalance":cBalance	 
		 
      });
    })
  });
  
  }else{
    res.redirect('/loginTest');
    return;
  }

  
});



router.post('/getAPointRecord', function(req, res, next){
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
  var limit = 5;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.GivePointRecord.count({point_type:"A"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.GivePointRecord.find({point_type:"A"}).limit(limit).skip(skip).then(function( docs){

	
      res.render('PointRecord', {
         title: 'Express',

         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit
      });
    })
  });
  
  
})




/* GET home page. */
router.get('/getBPointRecord', function(req, res, next) {

  var user = req.session.user;
  
  if(user && user.username){
	  
	  
	var account = user.useraccount

	//账户积分余额
    var aBalance = a.balanceOf(account);
    var bBalance = b.balanceOf(account);
    var cBalance = c.balanceOf(account); 	

  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 5;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.GivePointRecord.count({point_type:"B"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.GivePointRecord.find({point_type:"B"}).limit(limit).skip(skip).then(function( docs){

	
      res.render('PointRecordB', {
         title: 'Express',

         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit,
		 "username":user.username,"aBalance":aBalance,"bBalance":bBalance,"cBalance":cBalance	 
		 
      });
    })
  });
  
  }else{
    res.redirect('/loginTest');
    return;
  }
  
});

router.post('/getBPointRecord', function(req, res, next){
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
  var limit = 5;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.GivePointRecord.count({point_type:"B"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.GivePointRecord.find({point_type:"B"}).limit(limit).skip(skip).then(function( docs){

	
      res.render('PointRecordB', {
         title: 'Express',

         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit
      });
    })
  });
  


  
})


/* GET home page. */
router.get('/getCPointRecord', function(req, res, next) {
  var user = req.session.user;
  
  if(user && user.username){
	  
	  
	var account = user.useraccount

	//账户积分余额
    var aBalance = a.balanceOf(account);
    var bBalance = b.balanceOf(account);
    var cBalance = c.balanceOf(account); 	


  var page = Number(req.query.page || 1);   //当前页面，默认1
  var limit = 5;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.GivePointRecord.count({point_type:"C"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.GivePointRecord.find({point_type:"C"}).limit(limit).skip(skip).then(function( docs){

	
      res.render('PointRecordC', {
         title: 'Express',

         items: docs.reverse(),

         page: page,
         count: count,
         pages: pages,
         limit: limit,
		 "username":user.username,"aBalance":aBalance,"bBalance":bBalance,"cBalance":cBalance	 
		 
      });
    })
  });
  
  }else{
    res.redirect('/loginTest');
    return;
  }
  
});

router.post('/getCPointRecord', function(req, res, next){
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
  var limit = 5;     //每页多少条
  // var skip = (page-1)*limit;   //跳过多少条
  var pages = 0;   //默认总页数

  Model.GivePointRecord.count({point_type:"C"}).then(function(count){

    pages = Math.ceil(count/limit);   // 计算总页数,向上取整3.5=4
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page-1)*limit;   //跳过多少条

    Model.GivePointRecord.find({point_type:"C"}).limit(limit).skip(skip).then(function( docs){

	
      res.render('PointRecordC', {
         title: 'Express',

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
