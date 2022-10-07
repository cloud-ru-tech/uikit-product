import { fixture, Selector, test } from 'testcafe';

import { ToggleGroupProps } from '@sbercloud/uikit-product-toggle-group';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function getPage(props: Partial<ToggleGroupProps>) {
  return getTestcafeUrl({ group: 'toggle-group', name: 'toggle-group', props });
}

fixture('ToggleGroup');

test.page(getPage({ mode: 'checkbox' as ToggleGroupProps['mode'] }))('select checkbox cards correctly', async t => {
  const basicImagesCard = Selector(dataTestIdSelector('basic-images-card-1'));
  const modelsCard = Selector(dataTestIdSelector('models-card-1'));
  const containersCard = Selector(dataTestIdSelector('containers-card-1'));
  const checkedInputs = Selector(dataTestIdSelector('toggle-card-box-input-checked'));

  await t
    .click(basicImagesCard)
    .click(modelsCard)
    .click(containersCard)
    .click(containersCard)
    .expect(checkedInputs.count)
    .eql(2);
});

test.page(getPage({ mode: 'radio' as ToggleGroupProps['mode'] }))('select radio cards correctly', async t => {
  const basicImagesCard = Selector(dataTestIdSelector('basic-images-card-1'));
  const modelsCard = Selector(dataTestIdSelector('models-card-1'));
  const containersCard = Selector(dataTestIdSelector('containers-card-1'));
  const checkedInputs = Selector(dataTestIdSelector('toggle-card-box-input-checked'));

  await t
    .click(basicImagesCard)
    .click(modelsCard)
    .click(containersCard)
    .click(containersCard)
    .expect(checkedInputs.count)
    .eql(1);
});
