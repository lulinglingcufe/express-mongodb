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


router.get('/admin', function(req, res, next) {
  var user = req.session.user;
  if(user && user.username){
	var account = user.useraccount

	//账户积分余额
    var aBalance = a.balanceOf(account);
    var bBalance = b.balanceOf(account);
    var cBalance = c.balanceOf(account); 
	
  
	//Model.Article.find({"content":"文字1"}, function(err, docs){\
	//返回“该“用户的收件人信息
    Model.Recevier.find({"author":user.username}, function(err, docs){
      if(err){
        console.log(err);
        return;
      }else{
		  
		res.render('admin',{user: user, items: docs,"aBalance":aBalance,"bBalance":bBalance,"cBalance":cBalance});
        return;
      }
    })
	
  }else{
    res.redirect('/loginTest');
    return;
  }
});



//检查是否已经是默认地址
router.post('/checkDefault',function(req,res,next){

	var content = req.body.content;

	console.log(content);
	//console.log("hello world");

 res.send({content:content});
 
});

























module.exports = router;
