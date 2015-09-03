import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';

function renderCaption() {
console.log("renderCaption");
  return h('figcaption.oz-fig-cap', 
    'CSS 3D Transformed HTML Sphere'
  );
}

function renderEco() {
console.log("renderEco");
  return h('div.oz-eco', [
    h('ul.oz-orb', [
      h('li.oz-cir.oz-cir--1'),
      h('li.oz-cir.oz-cir--2'),
      h('li.oz-cir.oz-cir--3'),
      h('li.oz-cir.oz-cir--4'),
    ])
  ]);
}

export default function view(ecos$) {
console.log("eco-view", ecos$);
  return ecos$.map(ecos =>
    h('figure.oz-fig', [
      renderEco(),
      renderCaption()
    ])
  );
}
