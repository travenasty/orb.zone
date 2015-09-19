import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';
import _ from 'lodash';

function renderCaption() {
  return h('figcaption.oz-fig-cap', 
    'CSS 3D Transformed HTML Sphere'
  );
}

function renderEco() {
  let pyra = function(rows = 22, scale = 1, color = "#F22") {
    const ANG = 90 / (rows + 1);
    const RAD = rows * scale;
    const LEN = (Math.PI / 2) / (rows + 1);
    const TAN30 = Math.tan(30);

    let rotX = 0;
    let rotY = 0;
    let rowDeg = 0;
    let step = 1;
    let xDeg = 90 / rows;
    let yDeg = 0;

    return _.times(rows, (row) => {
      row = row + 1;
      rowDeg -= xDeg;
      rotX = rowDeg;
      rotY = 0;
      yDeg = 60 / row;

      console.log("yDeg:", yDeg, "row:", row);

      return _.times(row, (col) => {
        let transform = `
          rotateX(${rotX}deg)
          rotateY(${rotY}deg)
          translateZ(${RAD}em)
        `;

        let dot = h('li.oz-orb-face-dot', {
          dataset: {
            tri: 1,
            dot: step,
            rotX: rotX,
            rotY: rotY,
          },
          style: {
            borderColor: color,
            transform: transform,
          }
        }, step);

        rotY += yDeg;
        step += 1;

        return dot;
      })
    });
  };

  let pyraFace = (color) => {
    return h('ul.oz-orb-face', [
      pyra(12, 1.5, color),
    ])
  };

  return h('div.oz-eco', {
    attributes: {tabindex: "0"}
  }, [
    h('ul.oz-orb', [
      h('li.oz-orb-hemi', [
        ["#F33","#3F3","#33F","#966","#696","#669"].map(pyraFace)
      ]),
      h('li.oz-orb-hemi', [
        ["#5AA","#A5A","#AA5","#CBB","#BCB","#BBC"].map(pyraFace)
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
  return ecos$.map(ecos =>
    h('figure.oz-fig', [
      renderEco(),
      renderCaption()
    ])
  );
}
