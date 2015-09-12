import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';

function renderHeader() {
  return h('header.oz--header', [
    h('h1.oz-job-header', 'Jobs'),
    h('input.oz-job-input', {
      type: 'text',
      value: '',
      attributes: {placeholder: 'What needs to be done?'},
      autofocus: true,
      name: 'newJob'
    })
  ]);
}

function renderMainSection(jobsData) {
  let allCompleted = jobsData.list.reduce((x, y) => x && y.completed, true);
  return h('section.oz-job-main', {
    style: {'display': jobsData.list.length ? '' : 'none'}
  }, [
    h('input.oz--toggle-all', {
      type: 'checkbox',
      checked: allCompleted
    }),
    h('ul.oz-job-list', jobsData.list
      .filter(jobsData.filterFn)
      .map(data => data.jobItem.DOM)
    )
  ])
}

function renderFooter(jobsData) {
  let amountCompleted = jobsData.list
    .filter(jobData => jobData.completed)
    .length;
  let amountActive = jobsData.list.length - amountCompleted;
  return h('footer.oz--footer', {
    style: {'display': jobsData.list.length ? '' : 'none'}
  }, [
    h('span.oz-job-count', [
      h('strong', String(amountActive)),
      ' item' + (amountActive !== 1 ? 's' : '') + ' left'
    ]),
    h('ul.oz-job-filters', [
      h('li', [
        h('a' + (jobsData.filter === '' ? '.oz--selected' : ''), {
          attributes: {'href': '#/'}
        }, 'All')
      ]),
      h('li', [
        h('a' + (jobsData.filter === 'active' ? '.oz--selected' : ''), {
          attributes: {'href': '#/active'}
        }, 'Active')
      ]),
      h('li', [
        h('a' + (jobsData.filter === 'completed' ? '.oz--selected' : ''), {
          attributes: {'href': '#/completed'}
        }, 'Completed')
      ]),
      h('li', [
        h('a' + (jobsData.filter === 'mine' ? '.oz--selected' : ''), {
          attributes: {'href': '#/mine'}
        }, 'Mine')
      ])
    ]),
    (amountCompleted > 0 ?
      h('button.oz--clear-completed', 'Clear completed (' + amountCompleted + ')')
      : null
    )
  ])
}

export default function view(jobs$) {
  return jobs$.map(jobs =>
    h('div.oz-job', [
      renderHeader(),
      renderMainSection(jobs),
      renderFooter(jobs)
    ])
  );
};
