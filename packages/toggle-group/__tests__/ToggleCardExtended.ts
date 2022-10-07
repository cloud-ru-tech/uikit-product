import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('ToggleCardExtended').page(getTestcafeUrl({ group: 'toggle-group-toggle-card', name: 'extended' }));

test('renders correctly', async t => {
  const title = Selector(dataTestIdSelector('toggle-card-extended-title'));
  const displayedValue = Selector(dataTestIdSelector('toggle-card-extended-displayed-value'));
  const description = Selector(dataTestIdSelector('toggle-card-extended-description'));
  const label = Selector(dataTestIdSelector('toggle-card-extended-label'));

  await t
    .expect(title.exists)
    .ok()
    .expect(displayedValue.exists)
    .ok()
    .expect(description.exists)
    .ok()
    .expect(label.exists)
    .ok();
});
