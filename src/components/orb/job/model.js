import {Rx} from '@cycle/core';

function getFilterFn(route) {
  switch (route) {
    case '/active': return (task => task.completed === false);
    case '/completed': return (task => task.completed === true);
    default: return () => true; // allow anything
  }
}

function determineFilter(jobsData, route) {
  jobsData.filter = route.replace('/', '').trim();
  jobsData.filterFn = getFilterFn(route);
  return jobsData;
}

function searchJobIndex(jobsList, jobid) {
  let top = jobsList.length;
  let bottom = 0;
  let pointerId;
  let index;
  for (var i = jobsList.length - 1; i >= 0; i--) { // binary search
    index = bottom + ((top - bottom) >> 1);
    pointerId = jobsList[index].id;
    if (pointerId === jobid) {
      return index;
    } else if (pointerId < jobid) {
      bottom = index;
    } else if (pointerId > jobid) {
      top = index;
    }
  }
  return null;
}

function makeModification$(actions) {
  let clearInputMod$ = actions.clearInput$.map(() => (jobsData) => {
    return jobsData;
  });

  let insertJobMod$ = actions.insertJob$.map((jobTitle) => (jobsData) => {
    let lastId = jobsData.list.length > 0 ?
      jobsData.list[jobsData.list.length - 1].id :
      0;
    jobsData.list.push({
      id: lastId + 1,
      title: jobTitle,
      completed: false
    });
    return jobsData;
  });

  let editJobMod$ = actions.editJob$.map(action => (jobsData) => {
    let jobIndex = searchJobIndex(jobsData.list, action.id);
    jobsData.list[jobIndex].title = action.title;
    return jobsData;
  });

  let toggleJobMod$ = actions.toggleJob$.map(id => (jobsData) => {
    let jobIndex = searchJobIndex(jobsData.list, id);
    let previousCompleted = jobsData.list[jobIndex].completed;
    jobsData.list[jobIndex].completed = !previousCompleted;
    return jobsData;
  });

  let toggleAllMod$ = actions.toggleAll$.map(() => (jobsData) => {
    let allAreCompleted = jobsData.list
      .reduce((x, y) => x && y.completed, true);
    jobsData.list.forEach((jobData) => {
      jobData.completed = allAreCompleted ? false : true;
    });
    return jobsData;
  });

  let deleteJobMod$ = actions.deleteJob$.map(id => (jobsData) => {
    let jobIndex = searchJobIndex(jobsData.list, id);
    jobsData.list.splice(jobIndex, 1);
    return jobsData;
  });

  let deleteCompletedMod$ = actions.deleteCompleted$.map(() => (jobsData) => {
    jobsData.list = jobsData.list
      .filter(jobData => jobData.completed === false);
    return jobsData
  });

  return Rx.Observable.merge(
    insertJobMod$, deleteJobMod$, toggleJobMod$, toggleAllMod$,
    clearInputMod$, deleteCompletedMod$, editJobMod$
  );
}

function model(actions, sourceJobsData$) {
  let modification$ = makeModification$(actions);
  let route$ = Rx.Observable.just('/').merge(actions.changeRoute$);

  return modification$
    .merge(sourceJobsData$)
    .scan((jobsData, modFn) => modFn(jobsData))
    .combineLatest(route$, determineFilter)
    .shareReplay(1);
}

export default model;
