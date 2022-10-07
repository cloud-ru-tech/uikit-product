import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import * as ServicesIcons from '../src/components/services-icons';
import { generateDataTestId } from '../stories/helpers/generateDataTestId';

fixture('Icons: Service').page(getTestcafeUrl({ name: 'services', group: 'icons' }));

test('Rendered', async t => {
  const iconsArray = Object.keys(ServicesIcons).map(generateDataTestId);

  for (const icon of iconsArray) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
