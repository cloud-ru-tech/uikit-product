import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { Icon } from '../src/constants';

fixture('[Predefined Decor Icon Private]:');

const visit = () =>
  getTestcafeUrl({
    group: 'icons-predefined',
    name: 'predefined-decor-icon-private',
  });

test.page(visit())(`Rendered`, async t => {
  await t.expect(Selector(dataTestIdSelector('predefinedDecorIcon-custom-test')).exists).ok();

  const iconsNames = Object.keys(Icon);

  for (const name of iconsNames) {
    await t.expect(Selector(dataTestIdSelector(`predefinedDecorIcon-${name}-test`)).exists).ok();
  }
});
