import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const serviceIcons = getIconsDataTestIds('svgs/service-icons');

fixture('Icons: Service Icons').page(getTestcafeUrl({ name: 'service', group: 'icons', category: 'console' }));

test('Rendered', async t => {
  for (const icon of serviceIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok(`${icon}`);
  }
});
