import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { getIconsDataTestIds } from '../utils/getIconsDataTestIds';

const AvatarPlaceholderIcons = getIconsDataTestIds('svgs/inherit/avatarPlaceholder');

fixture('Icons: Avatar Placeholder').page(getTestcafeUrl({ name: 'avatar-placeholder', group: 'icons' }));

test('Rendered', async t => {
  for (const icon of AvatarPlaceholderIcons) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
