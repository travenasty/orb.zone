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

const mergeWithDefaultJobsData = jobsData => {
  let defaultJobsData = {
    list: [],
    filter: '',
    filterFn: () => true // allow anything
  };
  return merge(defaultJobsData, jobsData);
}

export default function deserialize(localStorageValue$) {
  return localStorageValue$
    .map(safeJSONParse)
    .map(mergeWithDefaultJobsData);
};
