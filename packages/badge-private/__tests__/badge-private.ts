import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'badge__indicator';
const dotId = 'badge__dot';

const visit = (props?: Partial<{ number: number; isGroupMessage: boolean }>) =>
  getTestcafeUrl({
    name: 'badge',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });

fixture('Badge');

test.page(visit())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
});

test.page(visit({ number: 89 }))('number = 89, content should be 89', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).textContent).eql('89');
});

test.page(visit({ number: 100 }))('number = 100, content should be 99+', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).textContent).eql('99+');
});

test.page(visit({ number: 0 }))('number = 0, should contain svg dot', async t => {
  await t.expect(Selector(dataTestIdSelector(dotId)).exists).ok();
});

test.page(visit({ isGroupMessage: true }))('isGroupMessage: true, should contain svg dot', async t => {
  await t.expect(Selector(dataTestIdSelector(dotId)).exists).ok();
});
