import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

fixture('ToggleCardDisplayExtra').page(getTestcafeUrl({ group: 'toggle-group-toggle-card', name: 'display-extra' }));

test('renders correctly', async t => {
  const icon = Selector(dataTestIdSelector('toggle-card-display-extra-icon'));
  const caption = Selector(dataTestIdSelector('toggle-card-display-extra-caption'));
  const title = Selector(dataTestIdSelector('toggle-card-display-extra-title'));
  const description = Selector(dataTestIdSelector('toggle-card-display-extra-description'));

  await t
    .expect(icon.exists)
    .ok()
    .expect(caption.exists)
    .ok()
    .expect(title.exists)
    .ok()
    .expect(description.exists)
    .ok();
});
