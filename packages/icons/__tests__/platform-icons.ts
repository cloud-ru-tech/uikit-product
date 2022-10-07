import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import * as PlatformIcons from '../src/components/platform-icons';
import { generateDataTestId } from '../stories/helpers/generateDataTestId';

fixture('Icons: Platform').page(getTestcafeUrl({ name: 'platform', group: 'icons' }));

test('Rendered', async t => {
  const iconsArray = Object.keys(PlatformIcons).map(generateDataTestId);

  for (const icon of iconsArray) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
