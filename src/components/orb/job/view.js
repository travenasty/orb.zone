import {Rx} from '@cycle/core';
import {h} from '@cycle/dom';

function renderHeader() {
  return h('header.header', [
    h('h1', 'jobs'),
    h('input.new-job', {
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
  return h('section.main', {
    style: {'display': jobsData.list.length ? '' : 'none'}
  }, [
    h('input.toggle-all', {
      type: 'checkbox',
      checked: allCompleted
    }),
    h('ul.job-list', jobsData.list
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
  return h('footer.footer', {
    style: {'display': jobsData.list.length ? '' : 'none'}
  }, [
    h('span.job-count', [
      h('strong', String(amountActive)),
      ' item' + (amountActive !== 1 ? 's' : '') + ' left'
    ]),
    h('ul.filters', [
      h('li', [
        h('a' + (jobsData.filter === '' ? '.selected' : ''), {
          attributes: {'href': '#/'}
        }, 'All')
      ]),
      h('li', [
        h('a' + (jobsData.filter === 'active' ? '.selected' : ''), {
          attributes: {'href': '#/active'}
        }, 'Active')
      ]),
      h('li', [
        h('a' + (jobsData.filter === 'completed' ? '.selected' : ''), {
          attributes: {'href': '#/completed'}
        }, 'Completed')
      ])
    ]),
    (amountCompleted > 0 ?
      h('button.clear-completed', 'Clear completed (' + amountCompleted + ')')
      : null
    )
  ])
}

export default function view(jobs$) {
  return jobs$.map(jobs =>
    h('div', [
      renderHeader(),
      renderMainSection(jobs),
      renderFooter(jobs)
    ])
  );
};
