import {run, Rx} from '@cycle/core';
import CycleDOM from '@cycle/dom';
import jobs from './components/orb/job/index';
import ecos from './components/orb/eco/index';
import CustomDrivers from './drivers';

const main = ecos; // ... pair with jobs

run(main, {
  DOM: CycleDOM.makeDOMDriver('.oz-app'),
  localStorageSource: CustomDrivers.makeLocalStorageSourceDriver('oz-data'),
  localStorageSink: CustomDrivers.makeLocalStorageSinkDriver('oz-data'),
  falcorSource: CustomDrivers.makeFalcorSourceDriver('ozm'),
  falcorSink: CustomDrivers.makeFalcorSinkDriver('ozm'),
  initialHash: () => Rx.Observable.just(window.location.hash),
  hashchange: () => Rx.Observable.fromEvent(window, 'hashchange')
});
