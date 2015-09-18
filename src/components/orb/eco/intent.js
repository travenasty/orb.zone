import {Rx} from '@cycle/core';
import {ENTER_KEY, ESC_KEY} from '../../../utils';

export default function intent(DOM, itemActions) {
  const getEcoItemId = (name) => parseInt(name.replace('.eco-item', ''));

  return {
    clearInput$: DOM.select('.new-eco')
      .events('keyup')
      .filter(ev => ev.keyCode === ESC_KEY),

    insertEco$: DOM.select('.new-eco')
      .events('keyup')
      .filter(ev => {
        let trimmedVal = String(ev.target.value).trim();
        return ev.keyCode === ENTER_KEY && trimmedVal;
      })
      .map(ev => String(ev.target.value).trim()),

    toggleEco$: itemActions.toggle$
      .map(({name}) => name).map(getEcoItemId),

    deleteEco$: itemActions.delete$
      .map(({name}) => name).map(getEcoItemId),

    editEco$: itemActions.edit$
      .map(({name, title}) => ({id: getEcoItemId(name), title})),

    toggleAll$: DOM.select('.toggle-all').events('click'),

  }
};
