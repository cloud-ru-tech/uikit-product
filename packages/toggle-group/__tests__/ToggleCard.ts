import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('ToggleCard').page(getTestcafeUrl({ group: 'toggle-group-toggle-card', name: 'card' }));

test('renders correctly', async t => {
  const icon = Selector(dataTestIdSelector('toggle-card-icon'));
  const title = Selector(dataTestIdSelector('toggle-card-title'));
  const description = Selector(dataTestIdSelector('toggle-card-description'));

  await t.expect(icon.exists).ok().expect(title.exists).ok().expect(description.exists).ok();
});
