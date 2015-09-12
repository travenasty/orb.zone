var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-virtual-dom'));
var h = require('virtual-dom').h;

describe('My virtual-dom project', function () {
  var myVTree = h('div#foo', [
    h('h1.header', 'Welcome to our webpage'),
    h('ol.list', [
      h('li', 'First thing'),
      h('li', 'Second thing'),
      h('li', 'Third thing')
    ]),
  ]);

  it('should look roughly like a list', function () {
    var expected = h('div#foo', [
      h('h1.header'),
      h('ol.list')
    ]);
    expect(myVTree).to.look.like(expected);
  });

  it('should look exactly like a list', function () {
    var expected = h('div#foo', [
      h('h1.header', 'Welcome to our webpage'),
      h('ol.list', [
        h('li', 'First thing'),
        h('li', 'Second thing'),
        h('li', 'Third thing')
      ]),
    ]);
    expect(myVTree).to.look.exactly.like(expected);
  });
});
