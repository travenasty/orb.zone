import {Rx} from '@cycle/core';
import {ENTER_KEY, ESC_KEY} from '../../../utils';

export default function intent(DOM, hashchange, initialHash, itemActions) {
  const getJobItemId = (name) => parseInt(name.replace('.job-item', ''))

  return {
    changeRoute$: Rx.Observable.concat(
      initialHash.map(hash => hash.replace('#', '')),
      hashchange.map(ev => ev.newURL.match(/\#[^\#]*$/)[0].replace('#', ''))
    ),

    clearInput$: DOM.select('.new-job').events('keyup')
      .filter(ev => ev.keyCode === ESC_KEY),

    insertJob$: DOM.select('.new-job').events('keyup')
      .filter(ev => {
        let trimmedVal = String(ev.target.value).trim();
        return ev.keyCode === ENTER_KEY && trimmedVal;
      })
      .map(ev => String(ev.target.value).trim()),

    toggleJob$: itemActions.toggle$
      .map(({name}) => name).map(getJobItemId),

    deleteJob$: itemActions.delete$
      .map(({name}) => name).map(getJobItemId),

    editJob$: itemActions.edit$
      .map(({name, title}) => ({id: getJobItemId(name), title})),

    toggleAll$: DOM.select('.toggle-all').events('click'),

    deleteCompleted$: DOM.select('.clear-completed').events('click')
  };
};
