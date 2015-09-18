var express = require('express');
var session = require('express-session');
var falcor = require('falcor');
var FalcorServer = require('falcor-express');
var FalcorIoRedis = require('falcor-ioredis');
var Router = require('falcor-router');
var RedisStore = require('connect-redis')(session);
var config = require('./server_config');
var redisConfig = require('./redis_config');
var rx = require('rx');
var app = express();

var ozmCache = require('./data/ozmCache');
var ozm = new falcor.Model({cache: ozmCache()});

var portnum = 7770; // Use a env.arg to override. 

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

app.use('/ozm', FalcorServer.dataSourceRoute(function(req, res) {
    return ozm.asDataSource();
    //return new FalcorIoRedis(redisConfig);    
}));

// serve static files from public directory
app.use(express.static(__dirname + '/public'));

console.log("Webserver running on port :"+ portnum);  
var server = app.listen(portnum);

