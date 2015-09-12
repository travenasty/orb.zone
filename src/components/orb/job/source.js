const _ = require('lodash'); 
const safeJSONParse = str => JSON.parse(str) || {};

const mergeWithDefaultJobsData = jobsData => {
  let defaultJobsData = {
    list: [],
    filter: '',
    filterFn: () => true // allow anything
  };
  return _.merge(defaultJobsData, jobsData);
}

export default function deserialize(localStorageValue$) {
  return localStorageValue$
    .map(safeJSONParse)
    .map(mergeWithDefaultJobsData);
};
