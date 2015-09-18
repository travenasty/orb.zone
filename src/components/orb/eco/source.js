const _ = require('lodash');
const safeJSONParse = str => JSON.parse(str) || {};

const mergeWithDefaultEcosData = ecosData => {
  let defaultEcosData = {
    list: [],
    filter: '',
    filterFn: () => true // allow anything
  };
  return _.merge(defaultEcosData, ecosData);
}

export default function deserialize(falcorValue$) {
  return falcorValue$
    //.map(safeJSONParse)
    .map(mergeWithDefaultEcosData);
};
