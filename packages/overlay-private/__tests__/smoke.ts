import { Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'overlay-private-test';

fixture('[OverlayPrivate]:').page(
  getTestcafeUrl({
    name: 'overlay-private',
    props: {
      'data-test-id': testId,
    },
  }),
);

test('Rendered', async t => {
  await t
    .click(Selector(dataTestIdSelector('toggle_overlay')))
    .expect(Selector(dataTestIdSelector(testId)).visible)
    .ok();
});
