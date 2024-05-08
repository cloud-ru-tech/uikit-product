import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const HEADER_TEST_ID = 'product-header';

function getPage(props: Record<string, unknown> = {}) {
  return getTestcafeUrl({
    category: 'snack-uikit',
    name: 'product-header',
    globals: { brand: 'Cloud' },
    props: { ...props, 'data-test-id': HEADER_TEST_ID },
  });
}

function getHeader() {
  return Selector(dataTestIdSelector(HEADER_TEST_ID));
}

function getSelect() {
  return Selector(dataTestIdSelector('header__select'));
}

function getBreadcrumbs() {
  return Selector(dataTestIdSelector('header__breadcrumbs'));
}

function getSettingsButton() {
  return Selector(dataTestIdSelector('header__settings-menu-button'));
}

function getFinancialMenuButton() {
  return Selector(dataTestIdSelector('header__financial-menu__button'));
}

function getHelpButton() {
  return Selector(dataTestIdSelector('header__help-menu-button'));
}

function getNotificationButton() {
  return Selector(dataTestIdSelector('header__notification-panel-button'));
}

function getUserMenuButton() {
  return Selector(dataTestIdSelector('header__user-menu-button'));
}

function getUserMenuManageProfile() {
  return Selector(dataTestIdSelector('header__user-menu-manage-profile'));
}

function getUserMenuOrganization() {
  return Selector(dataTestIdSelector('header__user-menu-organization'));
}

function getUserMenuOrganizationOption(index: number) {
  return getUserMenuOrganization().nth(index);
}

function getUserMenuAddOrganization() {
  return Selector(dataTestIdSelector('header__user-menu-add-organization'));
}

function getUserMenuSwitchTheme() {
  return Selector(dataTestIdSelector('header__user-menu-switch-theme'));
}

function getUserMenuLogout() {
  return Selector(dataTestIdSelector('header__user-menu-logout'));
}

function getSelectGroupOrganization() {
  return Selector(dataTestIdSelector('header__select-group-organization'));
}

function getSelectAddOrganization() {
  return getSelectGroupOrganization().find(dataTestIdSelector('header__select-group-section-add-button'));
}

function getSelectOrganizationOption(id: string) {
  return getSelectGroupOrganization().find(dataTestIdSelector(`header__select-group-item-${id}`));
}

function getSelectGroupProject() {
  return Selector(dataTestIdSelector('header__select-group-project'));
}

function getSelectProjectValue() {
  return Selector(dataTestIdSelector('header__select-project-value'));
}

function getSelectProjectOption(id: string) {
  return getSelectGroupProject().find(dataTestIdSelector(`header__select-group-item-${id}`));
}

function getSelectProjectScroll() {
  return getSelectGroupProject().find(dataTestIdSelector('header__select-group-section-scroll'));
}

function getSelectProjectOptionActions(id: string) {
  return getSelectProjectOption(id).find(dataTestIdSelector('header__select-group-item-actions-button'));
}

function getSelectProjectOptionLabel(id: string) {
  return getSelectProjectOption(id).find(dataTestIdSelector('header__select-group-item-label'));
}

async function verifySelectedProject({
  t,
  options,
  selected,
}: {
  t: TestController;
  options: string[];
  selected: string;
}) {
  for (const option of options) {
    if (option === selected) {
      await t
        .expect(getSelectProjectOption(option).getAttribute('data-selected'))
        .eql('true', `project "${option}" is not selected`);
    } else {
      await t
        .expect(getSelectProjectOption(option).hasAttribute('data-selected'))
        .eql(false, `project "${option}" is selected by mistake`);
    }
  }
}

async function verifyFilteredProject({
  t,
  presentOptions,
  hiddenOptions,
}: {
  t: TestController;
  presentOptions: string[];
  hiddenOptions: string[];
}) {
  for (const option of presentOptions) {
    await t.expect(getSelectProjectOption(option).exists).ok(`project "${option}" is missing`);
  }

  for (const option of hiddenOptions) {
    await t.expect(getSelectProjectOption(option).exists).notOk(`project "${option}" is present`);
  }
}

function getSelectGroupPlatform() {
  return Selector(dataTestIdSelector('header__select-group-platform'));
}

function getSelectPlatformValue() {
  return Selector(dataTestIdSelector('header__select-platform-value'));
}

function getSelectPlatformOption(id: string) {
  return getSelectGroupPlatform().find(dataTestIdSelector(`header__select-group-item-${id}`));
}

function getSelectPlatformOptionLabel(id: string) {
  return getSelectPlatformOption(id).find(dataTestIdSelector('header__select-group-item-label'));
}

function getSearchIcon() {
  return Selector(dataTestIdSelector('header__select-group-section-search-icon'));
}

function getSearchInput() {
  return Selector(dataTestIdSelector('header__select-group-section-search-input'));
}

function getDrawerMenuButton() {
  return Selector(dataTestIdSelector('header__drawer-menu-button'));
}

function getDrawerMenuSelect() {
  return Selector(dataTestIdSelector('header__drawer-menu-select'));
}

function getSelectGroupProduct() {
  return Selector(dataTestIdSelector('header__drawer-menu-select-group-product'));
}

function getDrawerMenuSelectProductCategory() {
  return Selector(dataTestIdSelector('header__drawer-menu-select-product-category'));
}

function getDrawerMenuSelectProductName() {
  return Selector(dataTestIdSelector('header__drawer-menu-select-product-name'));
}

function getSelectProductOption(id: string) {
  return getSelectGroupProduct().find(dataTestIdSelector(`header__select-group-item-${id}`));
}

async function verifySelectedProduct({
  t,
  options,
  selected,
}: {
  t: TestController;
  options: string[];
  selected: string;
}) {
  for (const option of options) {
    if (option === selected) {
      await t
        .expect(getSelectProductOption(option).getAttribute('data-selected'))
        .eql('true', `product "${option}" is not selected`);
    } else {
      await t
        .expect(getSelectProductOption(option).hasAttribute('data-selected'))
        .eql(false, `product "${option}" is selected by mistake`);
    }
  }
}

function getDrawerMenuLink(id: string) {
  return Selector(dataTestIdSelector(`header__drawer-menu-link-${id}`));
}

function getDrawerMenuGroupCard(id: string) {
  return Selector(dataTestIdSelector(`header__drawer-menu-group-card-${id}`));
}

function getDrawerMenuSearch() {
  return Selector(dataTestIdSelector('header__drawer-menu-search'));
}

async function verifySelectedLink({
  t,
  options,
  selected,
}: {
  t: TestController;
  options: string[];
  selected: string;
}) {
  for (const option of options) {
    if (option === selected) {
      await t
        .expect(getDrawerMenuLink(option).getAttribute('data-appearance'))
        .eql('primary', `link "${option}" is not selected`);
      await t
        .expect(getDrawerMenuLink(option).getAttribute('data-text-mode'))
        .eql('accent', `link "${option}" is not selected`);
    } else {
      await t
        .expect(getDrawerMenuLink(option).getAttribute('data-appearance'))
        .eql('neutral', `link "${option}" is selected by mistake`);
      await t
        .expect(getDrawerMenuLink(option).getAttribute('data-text-mode'))
        .eql('default', `link "${option}" is selected by mistake`);
    }
  }
}

// eslint-disable-next-line testcafe-community/no-disabled-tests
fixture('Product Header').page(getPage()).skip;

test.page(
  getPage({
    showSelect: true,
    showPagePath: true,
    showSettings: true,
    showHelpMenu: true,
    showNotifications: true,
    showUserMenu: true,
    showBudget: true,
  }),
)('renders basic elements', async t => {
  await t.expect(getHeader().exists).ok('header is missing');
  await t.expect(getSelect().exists).ok('select is missing');
  await t.expect(getBreadcrumbs().exists).ok('breadcrumbs is missing');
  await t.expect(getFinancialMenuButton().exists).ok('budget is missing');
  await t.expect(getSettingsButton().exists).ok('settings button is missing');
  await t.expect(getHelpButton().exists).ok('help button is missing');
  await t.expect(getNotificationButton().exists).ok('notification button is missing');
  await t.expect(getUserMenuButton().exists).ok('user menu is missing');
});

test.page(
  getPage({
    showSelect: false,
    showPagePath: false,
    showSettings: false,
    showHelpMenu: false,
    showNotifications: false,
    showUserMenu: false,
    showBudget: false,
  }),
)('renders with hidden basic elements', async t => {
  await t.expect(getSelect().exists).notOk('select is present');
  await t.expect(getBreadcrumbs().exists).notOk('breadcrumbs is present');
  await t.expect(getSettingsButton().exists).notOk('settings button is present');
  await t.expect(getFinancialMenuButton().exists).notOk('budget is present');
  await t.expect(getHelpButton().exists).notOk('help button is present');
  await t.expect(getNotificationButton().exists).notOk('notification button is present');
  await t.expect(getUserMenuButton().exists).notOk('user menu is present');
});

test.page(
  getPage({
    showUserMenu: true,
    showUserMenuManagement: true,
    showUserMenuThemeSwitch: true,
    showUserMenuLogout: true,
    showAddOrganization: true,
  }),
)('renders with full user menu & select', async t => {
  await t.click(getUserMenuButton());

  await t.expect(getUserMenuManageProfile().exists).ok('user menu -> manage profile is present');
  await t.expect(getUserMenuOrganization().exists).ok('user menu -> organization is present');
  await t.expect(getUserMenuAddOrganization().exists).ok('user menu -> add organization is present');
  await t.expect(getUserMenuSwitchTheme().exists).ok('user menu -> switch theme is present');
  await t.expect(getUserMenuLogout().exists).ok('user menu -> logout is present');

  await t.click(getSelect());
  await t.expect(getSelectAddOrganization().exists).ok('select -> add organization button is present');
});

test.page(
  getPage({
    showUserMenu: true,
    showUserMenuManagement: false,
    showUserMenuThemeSwitch: false,
    showUserMenuLogout: false,
    showAddOrganization: false,
  }),
)('renders with minimal user menu & select', async t => {
  await t.click(getUserMenuButton());

  await t.expect(getUserMenuManageProfile().exists).notOk('user menu -> manage profile is missing');
  await t.expect(getUserMenuOrganization().exists).ok('user menu -> organization is present');
  await t.expect(getUserMenuAddOrganization().exists).notOk('user menu -> add organization is missing');
  await t.expect(getUserMenuSwitchTheme().exists).notOk('user menu -> switch theme is missing');
  await t.expect(getUserMenuLogout().exists).notOk('user menu -> logout is missing');

  await t.click(getSelect());
  await t.expect(getSelectAddOrganization().exists).notOk('select -> add organization button is missing');
});

test('should select organization', async t => {
  await t.click(getSelect());
  await t.click(getSelectOrganizationOption('2'));

  await t.expect(getSelectOrganizationOption('1').hasAttribute('data-selected')).eql(false);
  await t.expect(getSelectOrganizationOption('2').getAttribute('data-selected')).eql('true');

  await t.click(getUserMenuButton());

  await t.expect(getUserMenuOrganizationOption(0).hasAttribute('data-checked')).eql(false);
  await t.expect(getUserMenuOrganizationOption(1).getAttribute('data-checked')).eql('true');

  await t.click(getUserMenuOrganizationOption(0));
  await t.click(getUserMenuButton());

  await t.expect(getUserMenuOrganizationOption(0).getAttribute('data-checked')).eql('true');
  await t.expect(getUserMenuOrganizationOption(1).hasAttribute('data-checked')).eql(false);

  await t.click(getSelect());

  await t.expect(getSelectOrganizationOption('1').getAttribute('data-selected')).eql('true');
  await t.expect(getSelectOrganizationOption('2').hasAttribute('data-selected')).eql(false);
});

test('should select project', async t => {
  await t.click(getSelect());
  await t.click(getSelectProjectOption('2_2'));
  const expectedSelectedProject = await getSelectProjectOptionLabel('2_2').textContent;

  await verifySelectedProject({ t, options: ['1_1', '1_2', '2_1', '2_2', '3_1', '3_2', '3_3'], selected: '2_2' });
  await t.expect(getSelectProjectValue().textContent).eql(expectedSelectedProject);
});

test('should search & select project', async t => {
  await t.click(getSelect());
  const scrollTop = await getSelectProjectScroll().getBoundingClientRectProperty('top');
  const scrollHeight = await getSelectProjectScroll().getBoundingClientRectProperty('height');

  await t.expect(getSelectProjectOption('1_1').getBoundingClientRectProperty('top')).gt(scrollTop);
  await t.expect(getSelectProjectOption('3_3').getBoundingClientRectProperty('top')).gt(scrollTop + scrollHeight);

  await t.click(getSearchIcon());
  await t.typeText(getSearchInput(), '7');

  await verifyFilteredProject({
    t,
    presentOptions: ['3_3'],
    hiddenOptions: ['1_1', '1_2', '2_1', '2_2', '3_1', '3_2'],
  });

  await t.click(getSelectProjectOption('3_3'));

  const expectedSelectedProject = await getSelectProjectOptionLabel('3_3').textContent;
  await verifyFilteredProject({
    t,
    presentOptions: ['1_1', '1_2', '2_1', '2_2', '3_1', '3_2', '3_3'],
    hiddenOptions: [],
  });
  await verifySelectedProject({ t, options: ['1_1', '1_2', '2_1', '2_2', '3_1', '3_2', '3_3'], selected: '3_3' });
  await t.expect(getSelectProjectValue().textContent).eql(expectedSelectedProject);
  await t.expect(getSelectProjectOption('1_1').getBoundingClientRectProperty('top')).lt(scrollTop);
  await t.expect(getSelectProjectOption('3_3').getBoundingClientRectProperty('top')).lt(scrollTop + scrollHeight);
});

test('should show actions on project hover', async t => {
  await t.click(getSelect());

  await t.expect(getSelectProjectOptionActions('1_2').exists).notOk('actions are present');

  await t.hover(getSelectProjectOption('1_2'));

  await t.expect(getSelectProjectOptionActions('1_2').exists).ok('actions are missing');

  // await t.click(getSelectProjectOptionActions('1_2'));

  // await t.expect(Selector(dataTestIdSelector('header__select-group-item-actions-option')).exists).ok();
});

test('should select platform', async t => {
  await t.click(getSelect());
  await t.click(getSelectPlatformOption('2'));
  const expectedText = await getSelectPlatformOptionLabel('2').textContent;

  await t.expect(getSelectPlatformOption('1').hasAttribute('data-selected')).eql(false);
  await t.expect(getSelectPlatformOption('2').getAttribute('data-selected')).eql('true');
  await t.expect(getSelectPlatformOption('3').hasAttribute('data-selected')).eql(false);
  await t.expect(getSelectPlatformValue().textContent).eql(expectedText);
});

test('drawer menu -> should select product', async t => {
  await t.click(getDrawerMenuButton());
  await t.click(getDrawerMenuSelect());
  await t.click(getSelectProductOption('3'));

  await verifySelectedProduct({ t, options: ['1', '2', '3', 'lkp', 'admin'], selected: '3' });
  await t.expect(getDrawerMenuSelectProductCategory().textContent).eql('Облачная платформа');
  await t.expect(getDrawerMenuSelectProductName().textContent).eql('MLSpace');

  await t.click(getSelectProductOption('lkp'));

  await verifySelectedProduct({ t, options: ['1', '2', '3', 'lkp', 'admin'], selected: 'lkp' });
  await t.expect(getDrawerMenuSelectProductCategory().textContent).eql('Другой продукт');
  await t.expect(getDrawerMenuSelectProductName().textContent).eql('Личный кабинет партнера');
});

test('drawer menu -> should select service by click on the link', async t => {
  await t.click(getDrawerMenuButton());

  await t.click(getDrawerMenuLink('devtools'));

  await verifySelectedLink({ t, selected: 'devtools', options: ['monitoring', 'devtools', 'messages'] });

  await t.expect(getDrawerMenuGroupCard('devtools').getBoundingClientRectProperty('top')).within(0, 1);
});

test('drawer menu -> should select correct link when scrolling cards', async t => {
  await t.click(getDrawerMenuButton());

  await t.click(getDrawerMenuLink('devtools'));
  await t.expect(getDrawerMenuGroupCard('devtools').getBoundingClientRectProperty('top')).within(0, 1);
  await t.hover(getDrawerMenuGroupCard('devtools'));
  await t.scrollIntoView(getDrawerMenuGroupCard('containers'));

  await verifySelectedLink({ t, selected: 'containers', options: ['storage', 'containers', 'monitoring'] });
});

test('drawer menu -> should search services', async t => {
  await t.click(getDrawerMenuButton());
  await t.typeText(getDrawerMenuSearch(), 'об');

  const presentOptions = ['infrastructure', 'messages'];
  const hiddenOptions = [
    'network',
    'storage',
    'containers',
    'monitoring',
    'devtools',
    'serverless',
    'database',
    'dataplatform',
  ];

  for (const card of presentOptions) {
    await t.expect(getDrawerMenuGroupCard(card).exists).ok(`card "${card}" is missing`);
  }
  for (const card of hiddenOptions) {
    await t.expect(getDrawerMenuGroupCard(card).exists).notOk(`card "${card}" is present`);
  }
  await verifySelectedLink({ t, selected: '', options: [...presentOptions, ...hiddenOptions] });

  await t.click(getDrawerMenuLink('devtools'));

  await t.expect(getDrawerMenuSearch().find('input').value).eql('');
  await t.expect(getDrawerMenuGroupCard('devtools').getBoundingClientRectProperty('top')).within(0, 1);
  for (const card of [...presentOptions, ...hiddenOptions]) {
    await t.expect(getDrawerMenuGroupCard(card).exists).ok(`card "${card}" is missing`);
  }
  await verifySelectedLink({ t, selected: 'devtools', options: [...presentOptions, ...hiddenOptions] });
});
