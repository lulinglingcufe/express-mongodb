var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 引入session
var session = require('express-session');

var index = require('./routes/index');
var logout = require('./routes/logout');
var loginTest = require('./routes/loginTest');

var test1 = require('./routes/test1');  //分页测试
//var test2 = require('./routes/test2');   //发货删除货物测试
//var test3 = require('./routes/test3');   //测试
var PointRecord = require('./routes/PointRecord');   //测试

var adminTest = require('./routes/adminTest');

var adminlogin = require('./routes/adminlogin'); //admin管理员登录
var adminMGoods = require('./routes/adminMGoods'); //代替test2 管理货物。
var adminMpoint = require('./routes/adminMpoint'); //代替test3 管理积分记录。

var admin = require('./routes/admin');
var adminAdd = require('./routes/adminAdd');
var adminUpdate = require('./routes/adminUpdate');
var adminDefault = require('./routes/adminDefault');

var order = require('./routes/order');
var notSendOrder = require('./routes/notSendOrder');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 设置session
app.use(session({
  secret: 'hello,jie',
  cookie: {
    maxAge: 1000*60*1000,
    secure: false
  },
  resave: false,
  saveUninitialized: false
}));

app.use('/', index);
app.use('/', loginTest);
app.use('/', logout);

app.use('/', test1);
//app.use('/', test2);  //包括了删除还有发货操作，在一个js脚本里面
//app.use('/', test3);
app.use('/', adminlogin); //admin管理员登录
app.use('/', adminMGoods); //代替test2 管理货物。
app.use('/', adminMpoint); //代替test3 管理积分记录。




app.use('/', adminTest);
app.use('/', PointRecord);


//app.use('/admin', admin);
app.use('/', admin);
app.use('/admin', adminAdd);
app.use('/admin', adminUpdate);
app.use('/admin', adminDefault);

app.use('/', order);
app.use('/', notSendOrder);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
