import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const illustrationPlatformsIcons = getIconsDataTestIds('svgs/illustrations/platforms');

fixture('Illustrations: Platforms').page(
  getTestcafeUrl({ name: 'platforms', group: 'icons-illustrations', category: 'snack-uikit' }),
);

test('Rendered', async t => {
  for (const icon of illustrationPlatformsIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok(`${icon}`);
  }
});
