import {Rx} from '@cycle/core';
import {ENTER_KEY, ESC_KEY} from '../../../utils';
import gsap from 'gsap/src/minified/TweenLite.min';

console.log("gsap:", gsap);

export default function intent(DOM, itemActions) {
  const getEcoItemId = (name) => parseInt(name.replace('.eco-item', ''));

  let mouseDown$ = DOM.select('.oz-eco').events('mousedown');
  let mouseMove$ = DOM.select(':root').events('mousemove');
  let mouseUp$ = DOM.select(':root').events('mouseup');

  return {
    clearInput$: DOM.select('.new-eco')
      .events('keyup')
      .filter(ev => ev.keyCode === ESC_KEY),

    spinEco$: mouseDown$.concatMap((contactPoint) => {
        return mouseMove$.takeUntil(mouseUp$).map((movePoint) => {
          return {
            x: movePoint.pageX - contactPoint.offsetX,
            y: movePoint.pageY - contactPoint.offsetY,
          };
        });
      }),

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
