import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import * as ColorIcons from '../src/components/color-icons';
import { generateDataTestId } from '../stories/helpers/generateDataTestId';

fixture('Icons: Color').page(getTestcafeUrl({ name: 'color', group: 'icons' }));

test('Rendered', async t => {
  const iconsArray = Object.keys(ColorIcons).map(generateDataTestId);

  for (const icon of iconsArray) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
