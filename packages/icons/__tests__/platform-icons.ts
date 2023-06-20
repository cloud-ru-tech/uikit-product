import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const PlatformIcons = getIconsDataTestIds('svgs/color/platform');

fixture('Icons: Platform').page(getTestcafeUrl({ name: 'platform', group: 'icons' }));

test('Rendered', async t => {
  for (const icon of PlatformIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
