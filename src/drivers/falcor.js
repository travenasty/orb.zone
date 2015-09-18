import {Rx} from '@cycle/core';

function makeFalcorSourceDriver(endpoint) {
  var model = new falcor.Model({
    source: new falcor.HttpDataSource(endpoint) 
  });
  
  var path = ["bioById", "12345abc", "appState"];

  return () => Rx.Observable.just(
    model.getValue(path).then(data => {
      console.log("state:", data);
      return data;
    })
  );
}

function makeFalcorSinkDriver(keyName) {
  return function (keyValue$) {
    keyValue$.subscribe(keyValue => {
      console.log("write to falcor:", keyName, keyValue);
    });
  };
}

export default {makeFalcorSourceDriver, makeFalcorSinkDriver};

