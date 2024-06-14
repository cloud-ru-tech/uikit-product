import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const interfaceIcons = getIconsDataTestIds('svgs/inherit/interface-old');

fixture('Icons: Interface').page(getTestcafeUrl({ name: 'interfaces', group: 'icons-deprecated' }));

test('Rendered', async t => {
  for (const icon of interfaceIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok(`${icon}`);
  }
});
