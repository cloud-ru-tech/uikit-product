import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const LogoIconsLight = getIconsDataTestIds('svgs/color/logos', fileName =>
  fileName.endsWith('Light.svg') ? fileName.replace('.svg', '') : '',
);

fixture('Icons: Logo').page(getTestcafeUrl({ name: 'logo', group: 'icons', category: 'snack-uikit' }));

test('Rendered', async t => {
  for (const icon of LogoIconsLight) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
