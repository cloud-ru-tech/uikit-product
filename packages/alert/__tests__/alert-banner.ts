import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'alert-banner__test';
const titleId = 'alert-banner__content-title';
const closeButtonId = 'alert-banner__close-button';
const actionButtonId = 'alert-banner__action-button';

const visit = (props?: Partial<{ title: string; type: string; hideCloseButton: boolean; buttonProps?: boolean }>) =>
  getTestcafeUrl({
    group: 'alert',
    name: 'alert-banner',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });

fixture('Alert Banner');

['Alarm', 'Warning', 'Neutral'].forEach(type =>
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

test.page(visit())(`Action button visible`, async t => {
  await t.expect(Selector(dataTestIdSelector(actionButtonId)).exists).ok();
});

test.page(visit({ buttonProps: undefined }))('Action button hidden', async t => {
  await t.expect(Selector(dataTestIdSelector(actionButtonId)).exists).notOk();
});
