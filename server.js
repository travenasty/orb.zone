var falcorExpress = require('falcor-express');
var Router = require('falcor-router');
var express = require('express');
var app = express();

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with single key ("greeting")
  return new Router([
    {
      // match a request for the key "greeting"    
      route: "greeting",
      // respond with a PathValue with the value of "Hello World."
      get: function() {
        return {
          path: ["greeting"], 
          value: "Hello World!"
        };
      }
    },
    {
      route: "junk",
      get: function() {
        return {
          path: ["junk"],
          value: '{"some":"complex","__value":100,"is":true}'
        }
      }
    }
  ]);
}));

// serve static files from public directory
app.use(express.static(__dirname + '/public'));

var server = app.listen(7770);
