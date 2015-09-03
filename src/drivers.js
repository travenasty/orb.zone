import {Rx} from '@cycle/core';

var model = new falcor.Model({
  source: new falcor.HttpDataSource('/model.json') 
});

function makeLocalStorageSourceDriver(keyName) {
  return () => Rx.Observable.just(localStorage.getItem(keyName));
}

function makeLocalStorageSinkDriver(keyName) {
  return function (keyValue$) {
    keyValue$.subscribe(keyValue => {
      localStorage.setItem(keyName, keyValue)
    });
  };
}

function makeFalcorSourceDriver(keyName) {
  model.get("junk")
    .then(function(response) {
      console.log(JSON.parse(response.json.junk));
    });
  return () => Rx.Observable.just(1);
}

function makeFalcorSinkDriver(keyName) {
  return function (keyValue$) {
    keyValue$.subscribe(keyValue => {
      console.log("write to falcor:", keyName, keyValue);
    });
  };
}

export default {makeLocalStorageSinkDriver, makeLocalStorageSourceDriver, makeFalcorSourceDriver, makeFalcorSinkDriver};
