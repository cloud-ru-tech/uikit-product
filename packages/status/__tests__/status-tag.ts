import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function getPage(text?: string) {
  return getTestcafeUrl({
    name: 'status-tag',
    group: 'status',
    props: {
      text,
      'data-test-id': 'status-tag',
    },
  });
}

fixture('Status Tag');

test.page(getPage())('Without text', async t => {
  await t.expect(Selector(dataTestIdSelector('status-tag')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('status-tag__text')).exists).notOk();
});

test.page(getPage('test'))('With text', async t => {
  await t.expect(Selector(dataTestIdSelector('status-tag')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('status-tag__text')).innerText).contains('test');
});
