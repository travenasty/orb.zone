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
   * Generate the markup and plot sphere-face positions.
   */
  let pyra = function(rows = 22, scale = 2, color = "#F22") {
    const RAD = rows * scale;
    const ROWS = rows + 1;

    let angX = (90 / (ROWS - 0.5));
    let rotX = 0, rotY = 0, rotZ = 0;
    let step = 1;

    return h('ul.oz-orb-face', [
      _.times(ROWS, (row) => {
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
      })
    ]);
  }

  return h('div.oz-eco', {
    attributes: {tabindex: "0"}
  }, [
    h('ul.oz-orb', [
      h('li.oz-orb-hemi', [
        [
          "#666","#555","#444","#333","#222","#111"
        ].map( (color) => { return pyra(12, 1.5, color); })
      ]),
    ]),

    h('ul.oz-orb.oz--thick', [
      h('li.oz-orb-hemi', [
        h('ul.oz-orb-face', [
          h('li.oz-orb-face-dot.oz--solo')
        ])
      ]),
      h('li.oz-orb-hemi', [
        [
          "rgba(30,190,0,0.3)","rgba(0,60,180,0.3)","rgba(120,0,150,0.3)",
          "rgba(200,20,0,0.3)","rgba(200,140,10,0.3)","rgba(210,210,0,0.3)"
        ].map( (color) => { return pyra(6, 2.35, color); })
      ]),
    ]),

    h('ul.oz-orbit', {}, [
      h('li.oz-cir'),
      h('li.oz-cir'),
      h('li.oz-cir'),
      h('li.oz-cir'),
    ]),

    h('div#hacky', {style:{
      position: "absolute",
      width: "100px",
      height: "100px",
      background: "red",
    }}),

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
