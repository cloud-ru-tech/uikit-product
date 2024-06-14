import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const serviceIllustrations = getIconsDataTestIds('svgs/service-illustrations');

fixture('Icons: Service Illustrations').page(
  getTestcafeUrl({ name: 'service-illustrations', group: 'icons', category: 'snack-uikit' }),
);

test('Rendered', async t => {
  for (const icon of serviceIllustrations) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok(`${icon}`);
  }
});
