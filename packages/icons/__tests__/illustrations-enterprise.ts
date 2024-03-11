import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const illustrationEvolutionIcons = getIconsDataTestIds('svgs/illustrations/enterprise');

fixture('Illustrations: Enterprise').page(getTestcafeUrl({ name: 'enterprise', group: 'icons-illustrations' }));

test('Rendered', async t => {
  for (const icon of illustrationEvolutionIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok(`${icon}`);
  }
});
