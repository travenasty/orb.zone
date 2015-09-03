function merge() {
  let result = {};
  for (let i = 0; i < arguments.length; i++) {
    let object = arguments[i];
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        result[key] = object[key];
      }
    }
  }
  return result;
}

const safeJSONParse = str => JSON.parse(str) || {};

const mergeWithDefaultEcosData = ecosData => {
  let defaultEcosData = {
    list: [],
    filter: '',
    filterFn: () => true // allow anything
  };
  return merge(defaultEcosData, ecosData);
}

export default function deserialize(falcorValue$) {
  return falcorValue$
    .map(safeJSONParse)
    .map(mergeWithDefaultEcosData);
};
