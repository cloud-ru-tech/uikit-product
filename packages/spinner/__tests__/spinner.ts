import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function getPage(text: string) {
  return getTestcafeUrl({
    name: 'spinner',
    props: {
      'data-test-id': 'spinner__test',
      text: text,
    },
  });
}

fixture('Spinner');

test.page(getPage('Spinner'))('With text', async t => {
  await t.expect(Selector(dataTestIdSelector('spinner__test')).exists).ok();
  await t
    .expect(Selector(dataTestIdSelector('spinner__test')).find(dataTestIdSelector('spinner__text')).textContent)
    .eql('Spinner');
});

test.page(getPage(''))('Without text', async t => {
  await t.expect(Selector(dataTestIdSelector('spinner__test')).exists).ok();
  await t
    .expect(Selector(dataTestIdSelector('spinner__test')).find(dataTestIdSelector('spinner__text')).exists)
    .notOk();
});
