import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const LogoIcons = getIconsDataTestIds('svgs/color/logos');

fixture('Icons: Logo').page(getTestcafeUrl({ name: 'logo', group: 'icons', category: 'snack-uikit' }));

test('Rendered', async t => {
  for (const icon of LogoIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
