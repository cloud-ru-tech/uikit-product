import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const ServicesIcons = getIconsDataTestIds('svgs/inherit/services');

fixture('Icons: Service').page(getTestcafeUrl({ name: 'services', group: 'icons' }));

test('Rendered', async t => {
  for (const icon of ServicesIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
