// In this example we demonstrate the communication between a model source and a server over a web worker

importScripts('./lib/falcor/falcor.browser.min.js');  

function WorkerServer(dataSource) {
  this.dataSource = dataSource;
}

// Deserializes a message from the client and executes the appropriate action on the model
WorkerServer.prototype.onmessage = function(action) {
  var method = action[0],
  jsonGraphEnvelope,
  callPath,
  pathSuffixes,
  paths;

  switch(method) {
    case "get": {
      paths = action[1];

      return this.dataSource.get(paths);
    }
    case "set": {
      jsonGraphEnvelope = action[1];

      return this.dataSource.set(jsonGraphEnvelope);
    }
    case "call": {
      callPath = action[1];
      args = action[2];
      pathSuffixes = action[3];
      paths = action[4];

      return this.dataSource.call(callPath, args, pathSuffixes, paths);
    }
  }
}

// create a server model
var dataSource = 
  new falcor.
    Model({
      cache: {
        user: {
          name: "Jim",
          location: {$type: "error", value: "Something broke!"}
        }
      }
    }).
    asDataSource();

// Create a worker server that translates requests into commands on the model
var workerServer = new WorkerServer(dataSource);

onmessage = function(e) {
  var data = e.data,
    // peel off the request id
    id = data[0];

  workerServer.
    onmessage(data.slice(1)).
    // Convert the output format of the ModelResponse to JSON Graph, because that is what the 
    // DataSource expects.
    toJSONG().
    subscribe(
      function(result) {
        // send back the response with the request id
        postMessage([id, null, result]);
      },
      function(error) {
        // send back the response with the request id
        postMessage([id, error]);
      }
    );
}
