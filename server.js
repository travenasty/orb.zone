var express = require('express');
var session = require('express-session');
var FalcorServer = require('falcor-express');
var FalcorIoRedis = require('falcor-ioredis');
var Router = require('falcor-router');
var RedisStore = require('connect-redis')(session);
var config = require('./server_config');
var redisConfig = require('./redis_config');
var app = express();

// Wire up a session for the current user.
app.use(session({
  store: new RedisStore(config.redis),
  secret: config.sess.secret,
  resave: config.sess.resave, 
  saveUninitialized: config.sess.saveUninitialized
}));

// Ensure that a session exists. 
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('Dang...')) // handle error
  }
  next()
});

app.use('/model.json', FalcorServer.dataSourceRoute(function(req, res) {
    return new FalcorIoRedis(redisConfig);    
}));

// serve static files from public directory
app.use(express.static(__dirname + '/public'));
var server = app.listen(7770);

