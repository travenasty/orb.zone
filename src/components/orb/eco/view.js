import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';
import _ from 'lodash';

function renderCaption() {
console.log("renderCaption");
  return h('figcaption.oz-fig-cap', 
    'CSS 3D Transformed HTML Sphere'
  );
}

function renderEco() {
  let pyra = function(steps = 22, color = "#F22") {
    let step = 0;
    let colsDeg = 0;
    let rowColsDeg = 0;
    let rowDeg = 90 / (steps);
    let colDeg = 60 / (steps);
    let rowStepDeg = colDeg;
    let rowsDeg = 0;

    return h('ul.oz-orb-face-dots', 
      _.times(steps, (row) => {
        colsDeg = 0;
        row = row + 1;
        rowsDeg -= rowDeg;
        rowColsDeg = rowsDeg;

        return _.times(row, (col) => {
          let trans = `
            rotateX(${rowColsDeg}deg)
            rotateY(${colsDeg}deg)
            rotateZ(${colsDeg}deg)
            translateZ(${steps * 1.5}em)
          `;
          let dot = h('li.oz-orb-face-dot', {
            dataset: {
              step: step,
              orb: 1,
            },
            style: {
              borderColor: color,
              transform: trans,
            }
          }, step);

          rowColsDeg += rowStepDeg;
          colsDeg += colDeg;
          step += 1;

          return dot;
        })
      })
    );
  };

console.log("oz-eco...");

  return h('div.oz-eco', {
    attributes: {tabindex: "0"}
  }, [
    h('ul.oz-orb', [
      h('li.oz-orb-face', [
        pyra(12, '#F33'),
      ]),
      h('li.oz-orb-face', [
        pyra(12, '#3F3'),
      ]),
      h('li.oz-orb-face', [
        pyra(12, '#33F'),
      ]),
      h('li.oz-orb-face', [
        pyra(12, '#966'),
      ]),
      h('li.oz-orb-face', [
        pyra(12, '#696'),
      ]),
      h('li.oz-orb-face', [
        pyra(12, '#669'),
      ]),
    ]),

    h('ul.oz-orbit', {}, [
      h('li.oz-cir'),
      h('li.oz-cir'),
      h('li.oz-cir'),
      h('li.oz-cir'),
    ]),

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
