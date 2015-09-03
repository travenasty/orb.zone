import {Rx} from '@cycle/core';
import intent from './intent';
import model from './model';
import view from './view';
import deserialize from './falcor-source';
import serialize from './falcor-sink';
import ecoItem from '../../eco-item';
import mapValues from 'lodash.mapvalues';

function amendStateWithChildren(DOM) {
console.log("amendStateWithChildren", DOM);
  return function (ecosData) {
    return {
      list: ecosData.list.map(data => {
        const props$ = Rx.Observable.just(data);
        return {
          id: data.id,
          title: data.title,
          ecoItem: ecoItem({DOM, props$}, `.oz-eco-item${data.id}`)
        }
      }),
      filter: ecosData.filter,
      filterFn: ecosData.filterFn,
    }
  };
}

function makeItemActions(typeItemActions, amendedState$) {
console.log("makeItemActions", typeItemActions, amendedState$);
  return mapValues(typeItemActions, (irrelevant, actionKey) => 
    amendedState$
    .filter(ecosData => ecosData.list.length)
    .flatMapLatest(ecosData =>
      Rx.Observable.merge(ecosData.list.map(i => i.ecoItem[actionKey]))
    )
  );
}

function replicateAll(objectStructure, realStreams, proxyStreams) {
console.log("replicateAll", proxyStreams);
  mapValues(objectStructure, (irrelevant, key) => {
    realStreams[key]
  });
}

function ecos({DOM, falcorSource}) {
console.log("ecos DOM", DOM);
  let sourceEcosData$ = deserialize(falcorSource);
  let typeItemActions = {toggle$: null, edit$: null, delete$: null};
  let proxyItemActions = mapValues(typeItemActions, () => new Rx.Subject());
  let actions = intent(DOM, proxyItemActions);
  let state$ = model(actions, sourceEcosData$).shareReplay(1);
  let amendedState$ = state$.map(amendStateWithChildren(DOM)).shareReplay(1);
console.log("amendedState$", amendedState$);
  let itemActions = makeItemActions(typeItemActions, amendedState$);
  replicateAll(typeItemActions, itemActions, proxyItemActions);
  return {
    DOM: view(amendedState$),
    falcorSink: serialize(state$)
  };
}

export default ecos;