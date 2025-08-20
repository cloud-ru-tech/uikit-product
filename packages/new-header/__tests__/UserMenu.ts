import { fixture } from 'testcafe';

import { getTestcafeUrl } from '../../../testcafe/utils';
import { selectors } from './selectors';

function getPage(props: Record<string, unknown> = {}) {
  return getTestcafeUrl({
    category: 'console',
    name: 'header-user-menu',
    story: 'user-menu',
    globals: { brand: 'Cloud', locale: 'en-GB' },
    props: { ...props, 'data-test-id': 'header__user-menu__button' },
  });
}

fixture('Product Header User Menu').page(getPage());

test.page(
  getPage({
    showUserMenu: true,
    showUserMenuManagement: true,
    showUserMenuLogout: true,
  }),
)('renders with full user menu', async t => {
  const { userMenuButton, userMenuManageProfile, userMenuSwitchTheme, userMenuLogout } = selectors;

  await t.click(userMenuButton);

  await t.expect(userMenuManageProfile.exists).ok('user menu -> manage profile is present');
  await t.expect(userMenuSwitchTheme.exists).ok('user menu -> switch theme is present');
  await t.expect(userMenuLogout.exists).ok('user menu -> logout is present');
});
