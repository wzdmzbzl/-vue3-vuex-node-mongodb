var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');
const NewsRouter = require('./routes/admin/NewsRouter');
const webNewsRouter = require('./routes/web/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const webProductRouter = require('./routes/web/ProductRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(webNewsRouter)
app.use(webProductRouter)


/**
 * adminApi - 后台系统用的接口
 * webApi - 企业官网用的
 */

app.use((req, res, next) => {
  // 如果token有效, next()
  // 如果token过期了, 返回401错误
  if(req.url === "/adminapi/user/login") {
    console.log("====");
    next()
    return
  }

  const token = req.headers["authorization"].split(" ")[1]
  if(token) {
    var payload = JWT.verify(token)
    if(payload) {
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, "1d")
      res.header("Authorization", newToken)
      next()
    }else {
      res.status(401).send({errCode: "-1", errorInfo: "token过期"})
    }
  }
})

app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
