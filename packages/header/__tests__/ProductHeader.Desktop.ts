import { fixture, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { basic, sortTests } from './basic';
import { HEADER_TEST_ID } from './constants';
import { searchTests } from './search';
import {
  getSelectOrganizationOption,
  getSelectPlatformOption,
  getSelectPlatformOptionLabel,
  getSelectProjectOption,
  getSelectProjectOptionActions,
  getSelectProjectOptionDroplist,
  getSelectProjectOptionLabel,
  getUserMenuOrganizationOption,
  selectors,
} from './selectors';
import { verifyFilteredProject, verifySelectedProject } from './utils';

function getPage(props: Record<string, unknown> = {}) {
  return getTestcafeUrl({
    category: 'console',
    name: 'header-desktop',
    story: 'desktop',
    globals: { brand: 'Cloud', locale: 'en-GB' },
    props: { ...props, 'data-test-id': HEADER_TEST_ID },
  });
}

fixture('Product Desktop Header').page(getPage());

test.page(
  getPage({
    showSelect: true,
    showPagePath: true,
    showSettings: true,
    showHelpMenu: true,
    showNotifications: true,
    showUserMenu: true,
  }),
)('renders basic elements', async t => {
  const { header, select, breadcrumbs, settingsButton, helpButton, notificationButton, userMenuButton } = selectors;

  await t.expect(header.exists).ok('header is missing');
  await t.expect(select.exists).ok('select is missing');
  await t.expect(breadcrumbs.exists).ok('breadcrumbs is missing');
  await t.expect(settingsButton.exists).ok('settings button is missing');
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
  const {
    header,
    vendorLogo,
    logo,
    select,
    breadcrumbs,
    settingsButton,
    helpButton,
    notificationButton,
    userMenuButton,
  } = selectors;

  await t.expect(header().exists).ok('header is missing');
  await t.expect(logo().exists).ok('logo is missing');
  await t.expect(vendorLogo.exists).ok('vendor logo is missing');
  await t.expect(select.exists).notOk('select is present');
  await t.expect(breadcrumbs.exists).ok('breadcrumbs is missing');
  await t.expect(settingsButton.exists).ok('settings button is missing');
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
  const { select, breadcrumbs, settingsButton, helpButton, notificationButton, userMenuButton } = selectors;

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
)('renders with full user menu & select', async t => {
  const { userMenuButton, userMenuManageProfile, userMenuSwitchTheme, userMenuLogout, select, selectAddOrganization } =
    selectors;

  await t.click(userMenuButton);

  await t.expect(userMenuManageProfile.exists).ok('user menu -> manage profile is present');
  await t.expect(getUserMenuOrganizationOption('1').exists).ok('user menu -> organization is present');
  await t.expect(userMenuSwitchTheme.exists).ok('user menu -> switch theme is present');
  await t.expect(userMenuLogout.exists).ok('user menu -> logout is present');

  await t.click(select());
  await t.expect(selectAddOrganization.exists).ok('select -> add organization button is present');
});

test('should select organization', async t => {
  const { select, selectOrganizationChip, userMenuButton } = selectors;

  await t.click(select);
  await t.click(selectOrganizationChip);

  await t.click(getSelectOrganizationOption('2'));

  await t.click(selectOrganizationChip);

  await t.expect(getSelectOrganizationOption('1').hasAttribute('data-checked')).eql(false);
  await t.expect(getSelectOrganizationOption('2').getAttribute('data-checked')).eql('true');

  await t.click(userMenuButton);

  await t.expect(getUserMenuOrganizationOption('1').hasAttribute('data-checked')).eql(false);
  await t.expect(getUserMenuOrganizationOption('2').getAttribute('data-checked')).eql('true');

  await t.click(getUserMenuOrganizationOption('1'));
  await t.click(userMenuButton);

  await t.expect(getUserMenuOrganizationOption('1').getAttribute('data-checked')).eql('true');
  await t.expect(getUserMenuOrganizationOption('2').hasAttribute('data-checked')).eql(false);

  await t.click(select);
  await t.click(selectOrganizationChip);

  await t.expect(getSelectOrganizationOption('1').getAttribute('data-checked')).eql('true');
  await t.expect(getSelectOrganizationOption('2').hasAttribute('data-checked')).eql(false);
});

test('should select project', async t => {
  const { select, selectProjectValue } = selectors;

  await t.click(select);
  const option = getSelectProjectOption('1_2');
  await t.click(option);
  await t.click(select);

  const expectedSelectedProject = await option.find(dataTestIdSelector('full-text')).textContent;

  await verifySelectedProject({ t, options: ['1_1', '1_2', '2_1', '2_2'], selected: '1_2' });
  await t.expect(selectProjectValue.textContent).eql(expectedSelectedProject);
});

test('should search & select project', async t => {
  const { select, searchInput, selectProjectValue } = selectors;

  const selectOption = '4_0';
  await t.click(select);

  await t.typeText(searchInput, selectOption);

  await verifyFilteredProject({
    t,
    presentOptions: [selectOption],
    hiddenOptions: ['1_1', '1_2', '2_1', '2_2'],
  });

  await t.click(getSelectProjectOption(selectOption));

  await t.click(select);
  await t.typeText(searchInput, '4');

  const expectedSelectedProject = await getSelectProjectOptionLabel(selectOption).textContent;
  await verifyFilteredProject({
    t,
    presentOptions: ['4_0', '4_1', '4_2', '4_2', '4_3'],
    hiddenOptions: [],
  });
  await verifySelectedProject({ t, options: ['4_0', '4_1', '4_2', '4_2', '4_3'], selected: selectOption });
  await t.expect(selectProjectValue.textContent).eql(expectedSelectedProject);
});

test.page(
  getPage({
    defaultProjectId: '5_1',
  }),
)('should automatically scroll down to selected project', async t => {
  const { select, selectProjectValue, searchInput } = selectors;

  await t.click(select);
  const option = getSelectProjectOption('5_1');
  const expectedSelectedProject = await option.find(dataTestIdSelector('full-text')).textContent;

  await verifySelectedProject({ t, options: ['4_9997', '4_9998', '4_9999', '5_1'], selected: '5_1' });
  await t.expect(selectProjectValue.textContent).eql(expectedSelectedProject);

  await t.typeText(searchInput, '4');
  await verifyFilteredProject({
    t,
    presentOptions: ['4_9995', '4_9996', '4_9997', '4_9998', '4_9999'],
    hiddenOptions: ['5_1'],
  });

  await t.typeText(searchInput, 'Проект 5', { replace: true });
  await verifyFilteredProject({
    t,
    presentOptions: ['3_1', '5_1'],
    hiddenOptions: ['4_9995', '4_9996', '4_9997', '4_9998', '4_9999'],
  });
  await verifySelectedProject({ t, options: ['3_1', '5_1'], selected: '5_1' });
});

test('should show actions on click options', async t => {
  const { select } = selectors;

  await t.click(select);

  const projectActionsDroplistTrigger = getSelectProjectOptionActions('1_1');

  await t.expect(projectActionsDroplistTrigger.exists).ok('actions are missing');

  await t.click(projectActionsDroplistTrigger);

  await t.expect(getSelectProjectOptionDroplist('1_1').exists).ok('action list is missing');
});

test('should select platform', async t => {
  const { drawerMenuButton, headerDrawerMenuSelect, selectPlatformValue } = selectors;

  await t.click(drawerMenuButton);
  await t.click(headerDrawerMenuSelect);
  const expectedText = await getSelectPlatformOptionLabel('2').textContent;
  await t.click(getSelectPlatformOption('2'));

  await t.click(headerDrawerMenuSelect);

  await t.expect(getSelectPlatformOption('1').hasAttribute('data-checked')).eql(false);
  await t.expect(getSelectPlatformOption('2').getAttribute('data-checked')).eql('true');
  await t.expect(getSelectPlatformOption('3').hasAttribute('data-checked')).eql(false);
  await t.expect(selectPlatformValue.textContent).eql(expectedText);
});

test.page(
  getPage({
    leaveOneOrganization: true,
  }),
)('should hide organization chip, if one organization is selected', async t => {
  const { select, selectOrganizationChip } = selectors;

  await t.click(select);

  await t.expect(selectOrganizationChip.exists).notOk('Organization chip is present');
});

basic(getPage);
searchTests();
sortTests(selectors.select, getPage);
