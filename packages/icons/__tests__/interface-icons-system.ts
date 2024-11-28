import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from './utils';

const interfaceSystemIcons = getIconsDataTestIds('svgs/interface-icons-system');

const size = 30;

fixture('Icons: Interface System').page(
  getTestcafeUrl({ name: 'interface-system', group: 'icons', category: 'console', props: { size } }),
);

test('Rendered', async t => {
  for (const icon of interfaceSystemIcons) {
    const iconElement = Selector(dataTestIdSelector(icon));
    await t.expect(iconElement.exists).ok();
    await t.expect(iconElement.getStyleProperty('width')).eql(`${size}px`);
    await t.expect(iconElement.getStyleProperty('height')).eql(`${size}px`);
  }
});
