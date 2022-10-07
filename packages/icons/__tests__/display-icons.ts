import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import * as DisplayIcons from '../src/components/display-icons';
import { generateDataTestId } from '../stories/helpers/generateDataTestId';

fixture('Icons: Display').page(getTestcafeUrl({ name: 'display', group: 'icons' }));

test('Rendered', async t => {
  const iconsArray = Object.keys(DisplayIcons).map(generateDataTestId);

  for (const icon of iconsArray) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
