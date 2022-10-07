import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('ToggleCardDisplay').page(getTestcafeUrl({ group: 'toggle-group-toggle-card', name: 'display' }));

test('renders correctly', async t => {
  const icon = Selector(dataTestIdSelector('toggle-card-display-icon'));
  const title = Selector(dataTestIdSelector('toggle-card-display-title'));

  await t.expect(icon.exists).ok().expect(title.exists).ok();
});
