import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import * as InterfaceIcons from '../src/components/interface-icons';
import { generateDataTestId } from '../stories/helpers/generateDataTestId';

fixture('Icons: Interface').page(getTestcafeUrl({ name: 'interfaces', group: 'icons' }));

test('Rendered', async t => {
  const iconsArray = Object.keys(InterfaceIcons).map(generateDataTestId);

  for (const icon of iconsArray) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
