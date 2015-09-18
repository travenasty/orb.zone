import {Rx} from '@cycle/core';
import {makeFalcorSourceDriver, makeFalcorSinkDriver} from './drivers/falcor';

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

export default {
  makeLocalStorageSinkDriver, 
  makeLocalStorageSourceDriver, 
  makeFalcorSourceDriver, 
  makeFalcorSinkDriver,
};
