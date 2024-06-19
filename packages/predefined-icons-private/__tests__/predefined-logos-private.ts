import { fixture, Selector } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('[Predefined Logos Private]:');

const visit = () =>
  getTestcafeUrl({
    group: 'icons-predefined',
    name: 'predefined-logos-private',
    category: 'snack-uikit',
  });

test.page(visit())(`Rendered`, async t => {
  await t.expect(Selector(dataTestIdSelector('icon-ml-space-full-logo-light')).exists).ok();
  await t.expect(Selector(dataTestIdSelector('icon-cloud-full-logo-light')).exists).ok();
});
