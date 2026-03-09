var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/NNPTUD-C2');
mongoose.connection.on('connected', () => {
  console.log("connected");
})

app.use('/api/v1/', require('./routes/index'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/roles', require('./routes/roles'));
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/auth', require('./routes/auth'));
// 69ae7df25b2422a837e7566c
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // Thiết lập status code
  res.status(err.status || 500);
  
  // Trả về JSON để Git Bash có thể đọc được thay vì HTML
  res.json({
    success: false,
    message: err.message,
    // Hiển thị stack lỗi nếu đang ở môi trường dev
    error: req.app.get('env') === 'development' ? err.stack : {}
  });
});

module.exports = app;
