import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const InterfaceIcons = getIconsDataTestIds('svgs/inherit/interface');

fixture('Icons: Interface').page(getTestcafeUrl({ name: 'interfaces', group: 'icons' }));

test('Rendered', async t => {
  for (const icon of InterfaceIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok(`${icon}`);
  }
});
