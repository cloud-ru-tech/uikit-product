import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'alert-compact__test';
const contentId = 'alert-compact__content';
const linkId = 'alert-compact__link';

const visit = (props?: Partial<{ linkProps: undefined; type: string }>) =>
  getTestcafeUrl({
    group: 'alert',
    name: 'alert-compact',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });

fixture('Alert Compact');

['Default', 'Attention'].forEach(type =>
  test.page(visit({ type }))(`Rendered ${type}`, async t => {
    await t.expect(Selector(dataTestIdSelector(contentId)).exists).ok();
  }),
);

test.page(visit())('Link visible', async t => {
  await t.expect(Selector(dataTestIdSelector(linkId)).exists).ok();
});

test.page(visit({ linkProps: undefined }))('Link hidden', async t => {
  await t.expect(Selector(dataTestIdSelector(linkId)).exists).notOk();
});
