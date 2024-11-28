import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const ExtensionIcons = getIconsDataTestIds('svgs/inherit/extension');

fixture('Icons: Extension').page(getTestcafeUrl({ name: 'extension', group: 'icons', category: 'console' }));

test('Rendered', async t => {
  for (const icon of ExtensionIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
