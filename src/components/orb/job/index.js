// Job is a single or reoccuring task that can be completed.

import {Rx} from '@cycle/core';
import intent from './intent';
import model from './model';
import view from './view';
import deserialize from './source';
import serialize from './sink';
import jobItem from './item';
import mapValues from 'lodash.mapvalues';

function amendStateWithChildren(DOM) {
  return function (jobsData) {
    return {
      list: jobsData.list.map(data => {
        const props$ = Rx.Observable.just(data);
        return {
          id: data.id,
          title: data.title,
          completed: data.completed,
          jobItem: jobItem({DOM, props$}, `.oz-job-item--${data.id}`),
        };
      }),
      filter: jobsData.filter,
      filterFn: jobsData.filterFn,
    };
  };
}

function makeItemActions(typeItemActions, amendedState$) {
  return mapValues(typeItemActions, (irrelevant, actionKey) =>
    amendedState$
    .filter(jobsData => jobsData.list.length)
    .flatMapLatest(jobsData =>
      Rx.Observable.merge(jobsData.list.map(i => i.jobItem[actionKey]))
    )
  );
}

function replicateAll(objectStructure, realStreams, proxyStreams) {
  mapValues(objectStructure, (irrelevant, key) => {
    realStreams[key].subscribe(proxyStreams[key].asObserver());
  });
}

function jobs({DOM, hashchange, initialHash, localStorageSource}) {
  let sourceJobsData$ = deserialize(localStorageSource);
  let typeItemActions = {toggle$: null, edit$: null, delete$: null};
  let proxyItemActions = mapValues(typeItemActions, () => new Rx.Subject());
  let actions = intent(DOM, hashchange, initialHash, proxyItemActions);
  let state$ = model(actions, sourceJobsData$).shareReplay(1);
  let amendedState$ = state$.map(amendStateWithChildren(DOM)).shareReplay(1);
  let itemActions = makeItemActions(typeItemActions, amendedState$);
  replicateAll(typeItemActions, itemActions, proxyItemActions);
  return {
    DOM: view(amendedState$),
    localStorageSink: serialize(state$)
  };
}

export default jobs;
