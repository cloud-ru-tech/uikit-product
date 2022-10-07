import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('ToggleCardDisplayLogo').page(getTestcafeUrl({ group: 'toggle-group-toggle-card', name: 'display-logo' }));

test('renders correctly', async t => {
  const icon = Selector(dataTestIdSelector('toggle-card-display-logo-icon'));
  const caption = Selector(dataTestIdSelector('toggle-card-display-logo-caption'));
  const title = Selector(dataTestIdSelector('toggle-card-display-logo-title'));

  await t.expect(icon.exists).ok().expect(caption.exists).ok().expect(title.exists).ok();
});
