import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';
import _ from 'lodash';

function renderCaption() {
  return h('figcaption.oz-fig-cap', 
    'CSS 3D Transformed HTML Sphere'
  );
}

function renderEco() {

  /**
   * 
   *
   *
   */
  let pyra = function(rows = 22, scale = 2, color = "#F22") {
    const RAD = rows * scale;
    const ROWS = rows + 1;
    const LEN = (Math.PI / 2) / ROWS;

    let angX = 90 / ROWS;
    let rotX = 0, rotY = 0, rotZ = 0;
    let step = 1;

    return _.times(ROWS, (row) => {
      row += 1;
      let angY = 0; // Not sure if needed.
      let angZ = 60 / row;

      if (row > 1) {
        rotX -= angX;
      }
      rotY = 0;
      rotZ = 0;

      return _.times(row, (col) => {
        let transform = `
          rotateZ(${rotZ}deg)
          rotateX(${rotX}deg)
          translateZ(${RAD}em)
        `;

        let dot = h('li.oz-orb-face-dot', {
          dataset: {
            tricon: 1,
            dot: step,
            rotX: rotX,
            rotY: rotY,
            rotZ: rotZ,
          },
          style: {
            borderColor: color,
            transform: transform,
          }
        }, step);

        rotZ -= angZ;
        step += 1;

        return dot;
      })
    });
  };

  let pyraFace = (color) => {
    return h('ul.oz-orb-face', {
      style: {
        // transform: 'rotateX(3deg)',
      }
    }, [
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
