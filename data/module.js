var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test50');
var articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  date: String,
  views: {type: Number, default: 0}
});

//用户信息
var userSchema = new mongoose.Schema({
  useraccount: String,
  username: String,
  password: String
  });
  
 //产品
var userBuySchema = new mongoose.Schema({
  username: String,   //下单人
  itemname: String,
  date: String,  //下单时间
  prize: String,
  point_type: String,
  is_send: {type: String, default: "no"},  //产品是否已经送到
  recevierName: {type: String, default: "notDecide"}, //收件人信息
  recevierPhone: {type: String, default: "notDecide"},
  recevierAddress: {type: String, default: "notDecide"}

  });  
  
//收件人信息
var recevierSchema = new mongoose.Schema({
  recevierName: String,
  author: String,
  recevierPhone: String,
  date: String,
  recevierAddress: String,
  AddressStatus: String  //是否为默认收件人
});

//默认收件人信息
var DefaultRecevierSchema = new mongoose.Schema({
  recevierName: String,
  author: String,
  recevierPhone: String,
  date: String,
  recevierAddress: String
});
  
  
  
  
// var Article = mongoose.model('Article', articleSchema);
// module.exports = Article;

var Model = {
  Article: mongoose.model('Article', articleSchema),
  User: mongoose.model('User', userSchema),
  Buy: mongoose.model('Buy', userBuySchema),
  Recevier: mongoose.model('Recevier', recevierSchema),
  DefaultRecevier: mongoose.model('DefaultRecevier', DefaultRecevierSchema)
  
};

module.exports = Model;