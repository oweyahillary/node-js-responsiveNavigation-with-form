var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var mysql = require('mysql'); 

var routes = require('./routes/index');

var app = express();

//mysql connection
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin@hill',
  database : 'portaluser'
});

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout',
partialsDir: path.join(__dirname, 'views/toolbar')}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index', { title: 'Purple calf' });
});
app.get('/test', function(req, res) {
  res.render('test', {title: 'test'});
});
//form getting data from the db
app.get('/form', function(req, res) {
    
    //create database
    let sqldb = 'CREATE DATABASE portaluser';
    con.query(sqldb, (err) => {
        error:err;
    });
    //create table users
    let sqltable = 'CREATE TABLE if not exists users(user_id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), activation INT NOT NULL DEFAULT 1, PRIMARY KEY(user_id))';
    con.query(sqltable, (err) => {
        error:err;
    });
    //insert data into db
    let postuser1 = {name:'user one'};
    let sqluser1 = 'INSERT INTO users SET ?';
    let query1 = con.query(sqluser1, postuser1, (err) => {
        error:err;
    });
    let postuser2 = {name:'user two',activation:'0'};
    let sqluser2 = 'INSERT INTO users SET ?';
    let query2 = con.query(sqluser2, postuser2, (err) => {
        error:err;
    });
    let postuser3 = {name:'user three'};
    let sqluser3 = 'INSERT INTO users SET ?';
    let query3 = con.query(sqluser3, postuser3, (err) => {
        error:err;
    });
    let postuser4 = {name:'user four',activation:'0'};
    let sqluser4 = 'INSERT INTO users SET ?';
    let query4 = con.query(sqluser4, postuser4, (err) => {
        error:err;
    });
    
    
    //get db data
    con.query("SELECT * FROM users",function(err, result, fields){
    res.render('form', {
        title: 'form',
        items: result,
        error:err
    });
});
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
