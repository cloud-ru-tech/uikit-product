import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const ColorIcons = getIconsDataTestIds('svgs/color/other');

fixture('Icons: Color').page(getTestcafeUrl({ name: 'color', group: 'icons' }));

test('Rendered', async t => {
  for (const icon of ColorIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
