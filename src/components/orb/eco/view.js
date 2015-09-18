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
  let dots = function(rows = 21) {
    let rowDeg = (90/rows).toFixed(3);
    let rowsDeg = 0;
console.log("rowDeg:", rowDeg);
    return h('ul.oz-orb-face-dots', 
      _.times(rows, (row) => {
        row = row + 1;
console.log("row:", row);
        rowsDeg += rowDeg;
        let colDeg = (60/row).toFixed(3);
console.log("colDeg:", colDeg);
        let colsDeg = 0;
        return _.times(row, (rowDot) => {
console.log("rowDot:", rowDot);
          let dot = h('li.oz-orb-face-dot', { 
            style: {
              'background-color': '#f22',
              'transform': `translateZ(15em) rotateX(${rowsDeg}) rotateY(${colsDeg})`
            }
          }, rowDot);
console.log("dot:", dot);
          colsDeg += colDeg;
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
        dots()
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
