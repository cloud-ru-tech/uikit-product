import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import * as LogoIcons from '../src/components/logo-icons';
import { generateDataTestId } from '../stories/helpers/generateDataTestId';

fixture('Icons: Logo').page(getTestcafeUrl({ name: 'logo', group: 'icons' }));

test('Rendered', async t => {
  const iconsArray = Object.keys(LogoIcons).map(generateDataTestId);

  for (const icon of iconsArray) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
