import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'alert__test';
const titleId = 'alert__content-title';
const closeButtonId = 'alert__close-button';

const visit = (props?: Partial<{ title: string; type: string; hideCloseButton: boolean }>) =>
  getTestcafeUrl({
    group: 'alert',
    name: 'alert',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });

fixture('Alert');

['Success', 'Warning', 'Error', 'Neutral', 'Loading'].forEach(type =>
  test.page(visit({ type }))(`Rendered ${type}`, async t => {
    await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
  }),
);

test.page(visit({ hideCloseButton: false }))(`Close button hidden`, async t => {
  await t.expect(Selector(dataTestIdSelector(closeButtonId)).exists).ok();
});

test.page(visit({ hideCloseButton: true }))(`Close button visible`, async t => {
  await t.expect(Selector(dataTestIdSelector(closeButtonId)).exists).notOk();
});

test.page(visit({ title: 'Title' }))(`Title = 'Title'`, async t => {
  await t.expect(Selector(dataTestIdSelector(titleId)).exists).ok();
});

test.page(visit({ title: '' }))(`Title = ''`, async t => {
  await t.expect(Selector(dataTestIdSelector(titleId)).exists).notOk();
});
