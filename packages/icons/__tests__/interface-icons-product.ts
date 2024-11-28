import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from './utils';

const interfaceProductIcons = getIconsDataTestIds('svgs/interface-icons-product');

const size = 30;

fixture('Icons: Interface Product').page(
  getTestcafeUrl({ name: 'interface-product', group: 'icons', category: 'console', props: { size } }),
);

test('Rendered', async t => {
  for (const icon of interfaceProductIcons) {
    const iconElement = Selector(dataTestIdSelector(icon));
    await t.expect(iconElement.exists).ok();
    await t.expect(iconElement.getStyleProperty('width')).eql(`${size}px`);
    await t.expect(iconElement.getStyleProperty('height')).eql(`${size}px`);
  }
});
