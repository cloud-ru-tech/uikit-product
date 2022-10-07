import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import * as ExtensionIcons from '../src/components/extension-icons';
import { generateDataTestId } from '../stories/helpers/generateDataTestId';

fixture('Icons: Extension').page(getTestcafeUrl({ name: 'extension', group: 'icons' }));

test('Rendered', async t => {
  const iconsArray = Object.keys(ExtensionIcons).map(generateDataTestId);

  for (const icon of iconsArray) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
