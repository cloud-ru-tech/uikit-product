import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const DisplayIcons = getIconsDataTestIds('svgs/inherit/display');

fixture('Icons: Display').page(getTestcafeUrl({ name: 'display', group: 'icons-deprecated' }));

test('Rendered', async t => {
  for (const icon of DisplayIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
