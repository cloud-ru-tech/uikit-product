import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import * as AvatarPlaceholderIcons from '../src/components/avatarPlaceholder-icons';
import { generateDataTestId } from '../stories/helpers/generateDataTestId';

fixture('Icons: Avatar Placeholder').page(getTestcafeUrl({ name: 'avatar-placeholder', group: 'icons' }));

test('Rendered', async t => {
  const iconsArray = Object.keys(AvatarPlaceholderIcons).map(generateDataTestId);

  for (const icon of iconsArray) {
    await t.expect(Selector(dataTestIdSelector(icon)).exists).ok();
  }
});
