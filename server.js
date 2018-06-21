const express = require('express');
const bodyParser = require('body-parser');
// const jwt = require('jwt-simple');
const jwt = require('jwt-simple');
const moment = require('moment');
const auth = require('./auth');
const {SECRET} = require('./config');
const {User} = require('./model');
const app = express();

// 处理表单格式请求体  application/www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// 处理JSON格式请求体 application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
});

// 注册
app.post('/signup', async function (req, res) {
  let user = req.body; // { username, password }
  let result = await User.findOne(user);
  if (result) {
    res.json({
      code: 1,
      message: '你已注册'
    });
    return;
  }

  let doc = await User.create(user);
  if (doc) {
    let {id, username} = doc;
    let token = jwt.encode({
      user: {
        id,
        username
      },
      exp: moment().add(10, 'minutes').valueOf()
    }, SECRET);

    res.json({
      code: 0,
      data: {
        token
      }
    })
  }
});

// 登录
app.post('/signin', async function (req, res) {
  let user = req.body;
  let doc = await User.findOne(user);
  if (doc) {
    let {id, username} = doc;
    let token = jwt.encode({
      user: {
        id,
        username
      },
      exp: moment().add(10, 'minutes').valueOf()
    }, SECRET);
    res.json({
      code: 0,
      data: {
        token
      }
    })
  } else {
    res.json({
      code: 1,
      message: '用户名/密码不正确'
    })
  }
});

// 用户页
app.get('/user', auth, function (req, res) {
  res.json({
    code: 0,
    data: {
      user: req.user
    }
  })
});

app.listen(8080);
