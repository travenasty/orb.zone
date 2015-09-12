import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';
import {propHook, ENTER_KEY, ESC_KEY} from '../../../utils';

function intent(DOM, name = '') {
  return {
    delete$: DOM.select(`${name} .oz--destroy`).events('click')
      .map(() => ({name})),
    toggle$: DOM.select(`${name} .oz--toggle`).events('change')
      .map(() => ({name})),
    startEdit$: DOM.select(`${name} .oz--label`).events('dblclick')
      .map(() => ({name})),
    cancelEdit$: DOM.select(`${name} .oz--edit`).events('keyup')
      .filter(ev => ev.keyCode === ESC_KEY)
      .map(() => ({name})),
    stopEdit$: DOM.select(`${name} .oz--edit`).events('keyup')
      .filter(ev => ev.keyCode === ENTER_KEY)
      .merge(DOM.select(`${name} .oz--edit`).events('blur'))
      .map(ev => ({title: ev.currentTarget.value, name}))
      .share()
  };
}

function model(props$, actions) {
  let sanitizedProps$ = props$.startWith({title: '', completed: false});
  let editing$ = Rx.Observable
    .merge(
      actions.startEdit$.map(() => true),
      actions.stopEdit$.map(() => false),
      actions.cancelEdit$.map(() => false)
    )
    .startWith(false);
  return Rx.Observable.combineLatest(
    sanitizedProps$, editing$,
    ({title, completed}, editing) =>
    ({title, completed, editing})
  );
}

function view(state$, name = '') {
  return state$.map(({title, completed, editing}) => {
    const completedClass = (completed ? '.oz--completed' : '');
    const editingClass = (editing ? '.oz--editing' : '');
    return h(`li.oz-job--item${name}${completedClass}${editingClass}`, [
      h('div.oz--view', [
        h('input.oz--toggle', {
          type: 'checkbox',
          checked: propHook(elem => elem.checked = completed)
        }),
        h('label.oz--label', title),
        h('button.oz--destroy')
      ]),
      h('input.oz--edit', {
        type: 'text',
        value: propHook(element => {
          element.value = title;
          if (editing) {
            element.focus();
            element.selectionStart = element.value.length;
          }
        })
      })
    ]);
  });
}

function jobItem({DOM, props$}, name = '') {
  let actions = intent(DOM, name);
  let state$ = model(props$, actions);
  let vtree$ = view(state$, name);
  return {
    DOM: vtree$,
    toggle$: actions.toggle$,
    delete$: actions.delete$,
    edit$: actions.stopEdit$,
  };
}

export default jobItem;
