import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'divider__test';

const visit = (props?: Partial<{ label: string; checked: boolean; disabled: boolean; handleChange: object }>) =>
  getTestcafeUrl({
    name: 'divider',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });

fixture('Divider');

test.page(visit())('Rendered', async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
});
