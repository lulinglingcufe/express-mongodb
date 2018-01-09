# express-mongodb
test  test test!!!

express+mongodb,实现CURE和登录注册
## 介绍
#### 登录
![](./doc/1508135589(1).png)
#### 注册
![](./doc/1508135594(1).png)
#### 后台主页
点击右上角用户名，进入
![](./doc/1508135618(1).png)
#### 修改
![](./doc/1508135625(1).png)
#### 前台首页
![](./doc/1508135632(1).png)
#### 详情页面
![](./doc/1508135638(1).png)
## 运行
#### 克隆
```
git clone https://github.com/pengrongjie/express-mongodb.git
```
#### 安装
```
cd express-mongodb
cnpm install
```
#### 修改数据库名字
```
data/module.js
```
修改为你自己想要的数据库名称
```
mongoose.connect('mongodb://localhost:27017/test70');
```
#### 运行
```
npm start
```
或者
```
node app.js
```
#### 浏览器打开
```
http://localhost:3000/
```
## 部署
#### 推送demo文件夹到远程
连接winSCP,出现根目录
![](./doc/1508138439(1).png)
进入/home,并且把demo文件夹复制进去
![](./doc/1508138554(1).png)
#### 阿里云pm2，永久运行
启动
```
cd 进入./bin/www
pm2 start www
```
暂停
```
pm2 stop www
```
列表
```
pm2 list
```
![](./doc/2153441650-59ded703b226d_articlex.png)
