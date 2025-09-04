import { fixture, test } from 'testcafe';

import { getTestcafeUrl } from '../../../../testcafe/utils';
import { basic, sortTests } from './basic';
import { HEADER_TEST_ID } from './constants';
import { searchTests } from './search';
import {
  getSelectPlatformOption,
  getSelectPlatformOptionLabel,
  getSelectProjectOptionActions,
  getSelectProjectOptionDroplist,
  getUserMenuOrganizationOption,
  selectors,
} from './selectors';

function getPage(props: Record<string, unknown> = {}) {
  return getTestcafeUrl({
    category: 'console',
    name: 'header-mobile',
    story: 'mobile',
    globals: { brand: 'Cloud', locale: 'en-GB' },
    props: { ...props, 'data-test-id': HEADER_TEST_ID },
  });
}

fixture('Product Mobile Header').page(getPage()).skip;

test.page(
  getPage({
    showPagePath: true,
    showSettings: true,
    showHelpMenu: true,
    showNotifications: true,
    showUserMenu: true,
  }),
)('renders basic elements', async t => {
  const { header, breadcrumbs, helpButton, notificationButton, userMenuButton } = selectors;

  await t.expect(header.exists).ok('header is missing');
  await t.expect(breadcrumbs.exists).ok('breadcrumbs is missing');
  await t.expect(helpButton.exists).ok('help button is missing');
  await t.expect(notificationButton.exists).ok('notification button is missing');
  await t.expect(userMenuButton.exists).ok('user menu is missing');
});

test.page(
  getPage({
    showSelect: false,
    showPagePath: true,
    showSettings: true,
    showHelpMenu: true,
    showNotifications: false,
    showUserMenu: true,
    showVendorLogo: true,
  }),
)('renders basic elements with vendor logo', async t => {
  const { header, breadcrumbs, helpButton, notificationButton, userMenuButton, logo, vendorLogo, select } = selectors;

  await t.expect(header.exists).ok('header is missing');
  await t.expect(logo.exists).ok('logo is missing');
  await t.expect(vendorLogo.exists).ok('vendor logo is missing');
  await t.expect(select.exists).notOk('select is present');
  await t.expect(breadcrumbs.exists).ok('breadcrumbs is missing');
  await t.expect(helpButton.exists).ok('help button is missing');
  await t.expect(notificationButton.exists).notOk('notification button is present');
  await t.expect(userMenuButton.exists).ok('user menu is missing');
});

test.page(
  getPage({
    showSelect: false,
    showPagePath: false,
    showSettings: false,
    showHelpMenu: false,
    showNotifications: false,
    showUserMenu: false,
  }),
)('renders with hidden basic elements', async t => {
  const { select, breadcrumbs, helpButton, notificationButton, userMenuButton, settingsButton } = selectors;

  await t.expect(select.exists).notOk('select is present');
  await t.expect(breadcrumbs.exists).notOk('breadcrumbs is present');
  await t.expect(settingsButton.exists).notOk('settings button is present');
  await t.expect(helpButton.exists).notOk('help button is present');
  await t.expect(notificationButton.exists).notOk('notification button is present');
  await t.expect(userMenuButton.exists).notOk('user menu is present');
});

test.page(
  getPage({
    showUserMenu: true,
    showUserMenuManagement: true,
    showUserMenuLogout: true,
  }),
)('renders with full user menu', async t => {
  const { userMenuLogout, userMenuSwitchTheme, userMenuManageProfile, userMenuButton } = selectors;

  await t.click(userMenuButton);

  await t.expect(userMenuManageProfile.exists).ok('user menu -> manage profile is present');
  await t.expect(getUserMenuOrganizationOption('1').exists).ok('user menu -> organization is present');
  await t.expect(userMenuSwitchTheme.exists).ok('user menu -> switch theme is present');
  await t.expect(userMenuLogout.exists).ok('user menu -> logout is present');
});

test('should show actions on click options', async t => {
  const { drawerMenuButton, drawerMenuSelectProject } = selectors;

  await t.click(drawerMenuButton);
  await t.click(drawerMenuSelectProject);

  const projectActionsDroplistTrigger = getSelectProjectOptionActions('1_1');
  await t.expect(projectActionsDroplistTrigger.exists).ok('actions are missing');

  await t.click(projectActionsDroplistTrigger);

  await t.expect(getSelectProjectOptionDroplist('1_1').exists).ok('action list is missing');
});

test('should select platform', async t => {
  const { drawerMenuButton, drawerMenuSelectPlatform, selectPlatformValue } = selectors;

  await t.click(drawerMenuButton);
  await t.click(drawerMenuSelectPlatform);
  const expectedText = await getSelectPlatformOptionLabel('2').textContent;
  await t.click(getSelectPlatformOption('2'));

  await t.click(drawerMenuButton);
  const currentOrganization = await selectPlatformValue.textContent;
  await t.click(drawerMenuSelectPlatform);

  await t.expect(getSelectPlatformOption('1').hasAttribute('data-checked')).eql(false);
  await t.expect(getSelectPlatformOption('2').getAttribute('data-checked')).eql('true');
  await t.expect(getSelectPlatformOption('3').hasAttribute('data-checked')).eql(false);
  await t.expect(currentOrganization).eql(expectedText);
});

test.page(
  getPage({
    leaveOneOrganization: true,
  }),
)('should hide organization chip, if one organization is selected', async t => {
  const { drawerMenuButton, drawerMenuSelectProject, selectOrganizationChip } = selectors;

  await t.click(drawerMenuButton);
  await t.click(drawerMenuSelectProject);

  await t.expect(selectOrganizationChip.exists).notOk('Organization chip is present');
});

basic(getPage);
searchTests({ openSearchSelector: selectors.mobileSearchTriggerButton, isMobile: true });
sortTests(selectors.drawerMenuButton, getPage, selectors.drawerMenuSelectProject);
