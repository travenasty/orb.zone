import {Rx} from '@cycle/core';

function getFilterFn(route) {
  switch (route) {
    default: return () => true; // allow anything
  }
}

function determineFilter(ecosData, route) {
  ecosData.filter = route.replace('/', '').trim();
  ecosData.filterFn = getFilterFn(route);
  return ecosData;
}

function searchEcoIndex(ecosList, ecoid) {
  let top = ecosList.length;
  let bottom = 0;
  let pointerId;
  let index;

  for (var i = ecosList.length - 1; i >= 0; i--) { // binary search
    index = bottom + ((top - bottom) >> 1);
    pointerId = ecosList[index].id;
    if (pointerId === ecoid) {
      return index;
    } else if (pointerId < ecoid) {
      bottom = index;
    } else if (pointerId > ecoid) {
      top = index;
    }
  }
  return null;
}

function makeModification$(actions) {

  let clearInputMod$ = actions.clearInput$.map(() => (ecosData) => {
    return ecosData;
  });

  let spinEcoMod$ = actions.spinEco$.map((spin) => (ecosData) => {
    console.log("ecosData:", ecosData);
/*
    $eco.style.transform = `
      rotateX(${spin.x}deg)
      rotateZ(${spin.y}deg)
    `;
*/
    return ecosData;
  });

  let insertEcoMod$ = actions.insertEco$.map((ecoTitle) => (ecosData) => {
    let lastId = ecosData.list.length > 0 ?
      ecosData.list[ecosData.list.length - 1].id :
      0;
    ecosData.list.push({
      id: lastId + 1,
      title: ecoTitle,
      completed: false
    });
    return ecosData;
  });

  let editEcoMod$ = actions.editEco$.map(action => (ecosData) => {
    let ecoIndex = searchEcoIndex(ecosData.list, action.id);
    ecosData.list[ecoIndex].title = action.title;
    return ecosData;
  });

  let toggleEcoMod$ = actions.toggleEco$.map(id => (ecosData) => {
    let ecoIndex = searchEcoIndex(ecosData.list, id);
    let previousCompleted = ecosData.list[ecoIndex].completed;
    ecosData.list[ecoIndex].completed = !previousCompleted;
    return ecosData;
  });

  let toggleAllMod$ = actions.toggleAll$.map(() => (ecosData) => {
    let allAreCompleted = ecosData.list
      .reduce((x, y) => x && y.completed, true);
    ecosData.list.forEach((ecoData) => {
      ecoData.completed = allAreCompleted ? false : true;
    });
    return ecosData;
  });

  let deleteEcoMod$ = actions.deleteEco$.map(id => (ecosData) => {
    let ecoIndex = searchEcoIndex(ecosData.list, id);
    ecosData.list.splice(ecoIndex, 1);
    return ecosData;
  });

  return Rx.Observable.merge(
    insertEcoMod$, spinEcoMod$, deleteEcoMod$, toggleEcoMod$, toggleAllMod$,
    clearInputMod$, editEcoMod$
  );
}

function model(actions, sourceEcosData$) {
  let modification$ = makeModification$(actions);
  let route$ = Rx.Observable.just('/'); //.merge(actions.changeRoute$);

  return modification$
    .merge(sourceEcosData$)
    .scan((ecosData, modFn) => modFn(ecosData))
    .combineLatest(route$, determineFilter)
    .shareReplay(1);
}

export default model;
