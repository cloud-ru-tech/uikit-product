import { Locator, Page } from '@playwright/test';

import { expect, test } from '../../../../playwright/fixtures';
import { getSelectors, GetSelectorsOptions } from './selectors';

type ExpectedSearchResultItem = {
  groupLabel: string;
  linkLabel: string;
};

enum Result {
  VirtualMachines = 'virtualMachines',
  Images = 'images',
  ApiGateway = 'apiGateway',
  ServerlessFunctions = 'serverlessFunctions',
  Vpc = 'vpc',
  FineTuning = 'fineTuning',
}

type SearchMenuItemConfig = {
  searchValue: string;
  expectedResults: {
    present: Result[];
    missing?: Result[];
  };
};

export type SearchTestsOptions = {
  openSearchSelector?: Locator;
  isMobile?: boolean;
};

type EntityConfig = SearchTestsOptions & {
  queries: {
    precise: [string];
    fuzzy?: [string, ...string[]];
  };
  expectedResults: SearchMenuItemConfig['expectedResults'];
};

const EXPECTED_RESULTS: Record<Result, ExpectedSearchResultItem> = {
  [Result.VirtualMachines]: { groupLabel: 'Инфраструктура', linkLabel: 'Виртуальные машины' },
  [Result.Images]: { groupLabel: 'Инфраструктура', linkLabel: 'Образы' },
  [Result.ApiGateway]: { groupLabel: 'Разработка', linkLabel: 'API gateway' },
  [Result.ServerlessFunctions]: { groupLabel: 'Разработка', linkLabel: 'Serverless functions' },
  [Result.Vpc]: { groupLabel: 'Сеть', linkLabel: 'VPC' },
  [Result.FineTuning]: { groupLabel: 'ML/AI инструменты', linkLabel: 'ML Finetuning' },
};

const ALL_AVAILABLE_LINKS = Object.values(EXPECTED_RESULTS);

function getSelectorOptions(options?: SearchTestsOptions): GetSelectorsOptions {
  return { isMobile: options?.isMobile };
}

async function activateMobileSearch(page: Page) {
  const { selectors } = getSelectors(page, { isMobile: true });
  const drawer = selectors.drawer as Locator;

  await expect(drawer).toBeVisible();

  if (!(await selectors.drawerSearchInput.isVisible())) {
    await selectors.mobileSearchTriggerButton.click();
  }

  await expect(selectors.drawerSearch).toBeVisible();
  await expect(selectors.drawerSearchInput).toBeVisible();
}

async function openMenuSearch(page: Page, options: SearchTestsOptions = {}) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  await selectors.drawerMenuButton.click();

  if (options.isMobile) {
    await activateMobileSearch(page);
  }

  if (options.openSearchSelector) {
    await options.openSearchSelector.click();
    if (options.isMobile) {
      await activateMobileSearch(page);
    }
  }
}

async function enterSearchQuery(page: Page, searchValue: string, options?: SearchTestsOptions) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  await selectors.drawerSearchInput.click();
  await selectors.drawerSearchInput.clear();
  await expect(selectors.drawerSearchInput).toHaveValue('');
  await selectors.drawerSearchInput.fill(searchValue);
  await expect(selectors.drawerSearchInput).toHaveValue(searchValue);
}

async function validateSearchFilterResultPresent(
  page: Page,
  { groupLabel, linkLabel }: ExpectedSearchResultItem,
  options?: SearchTestsOptions,
) {
  const { getDrawerMenuSearchResultGroupByText, getDrawerMenuSearchResultLinkInGroup } = getSelectors(
    page,
    getSelectorOptions(options),
  );

  await expect(getDrawerMenuSearchResultGroupByText(groupLabel)).toBeVisible();
  await expect(getDrawerMenuSearchResultLinkInGroup(groupLabel, linkLabel)).toBeVisible();
}

async function validateSearchFilterResultMissing(
  page: Page,
  { groupLabel, linkLabel }: ExpectedSearchResultItem,
  options?: SearchTestsOptions,
) {
  const { getDrawerMenuSearchResultLinkInGroup } = getSelectors(page, getSelectorOptions(options));

  await expect(getDrawerMenuSearchResultLinkInGroup(groupLabel, linkLabel)).not.toBeVisible();
}

function mapResultByName(result: Result): ExpectedSearchResultItem {
  return EXPECTED_RESULTS[result];
}

function getResultsToBeMissing({
  noResultsMode,
  expectedResults,
}: {
  noResultsMode: boolean;
  expectedResults: SearchMenuItemConfig['expectedResults'];
}): ExpectedSearchResultItem[] {
  if (noResultsMode) {
    return ALL_AVAILABLE_LINKS;
  }

  if (expectedResults.missing) {
    return expectedResults.missing.map(mapResultByName);
  }

  return Object.entries(EXPECTED_RESULTS).reduce((accArr: ExpectedSearchResultItem[], [resultName, resultItem]) => {
    if (!expectedResults.present.includes(resultName as Result)) {
      accArr.push(resultItem);
    }
    return accArr;
  }, []);
}

async function enterSearchQueryAndValidateResults(
  page: Page,
  { searchValue, expectedResults }: SearchMenuItemConfig,
  options?: SearchTestsOptions,
) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  await enterSearchQuery(page, searchValue, options);

  const noResultsMode = expectedResults.present.length < 1;

  const resultsToBePresent: ExpectedSearchResultItem[] = expectedResults.present.map(mapResultByName);
  const resultsToBeMissing = getResultsToBeMissing({ noResultsMode, expectedResults });

  if (noResultsMode) {
    await expect(selectors.drawerMenuNoFoundResults).toBeVisible();
  }

  for (const result of resultsToBePresent) {
    await validateSearchFilterResultPresent(page, result, options);
  }

  for (const result of resultsToBeMissing) {
    await validateSearchFilterResultMissing(page, result, options);
  }
}

async function validateInitialSearchState(page: Page, options?: SearchTestsOptions) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  await expect(selectors.drawerSearchInput).toHaveValue('');

  for (const linkCard of ALL_AVAILABLE_LINKS) {
    await validateSearchFilterResultPresent(page, linkCard, options);
  }
}

async function clearSearchQuery(page: Page, options?: SearchTestsOptions) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  await selectors.drawerSearchClearButton.click();
  await expect(selectors.drawerSearchClearButton).not.toBeVisible();
  await validateInitialSearchState(page, options);
}

async function validateFuzzyModeSelected(page: Page, options?: SearchTestsOptions) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  await expect(selectors.drawerSearchSettingsFuzzyOption).toHaveAttribute('data-checked', 'true');
  await expect(selectors.drawerSearchSettingsPreciseOption).not.toHaveAttribute('data-checked', 'true');
}

async function validatePreciseModeSelected(page: Page, options?: SearchTestsOptions) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  await expect(selectors.drawerSearchSettingsFuzzyOption).not.toHaveAttribute('data-checked', 'true');
  await expect(selectors.drawerSearchSettingsPreciseOption).toHaveAttribute('data-checked', 'true');
}

async function closeMobileSearchSettingsModal(page: Page, options?: SearchTestsOptions) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  if (await selectors.drawerSearchSettingsFuzzyOption.isVisible()) {
    await page.keyboard.press('Escape');
    await expect(selectors.drawerSearchSettingsFuzzyOption).toBeHidden();
  }
}

async function selectSearchModeMobile(page: Page, mode: 'fuzzy' | 'precise', options?: SearchTestsOptions) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  const target =
    mode === 'fuzzy' ? selectors.drawerSearchSettingsFuzzyOption : selectors.drawerSearchSettingsPreciseOption;

  await target.click();

  try {
    await expect(target).toBeHidden({ timeout: 3000 });
  } catch {
    await closeMobileSearchSettingsModal(page, options);
  }
}

async function isFuzzySearchModeSelected(page: Page, options?: SearchTestsOptions) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  return (await selectors.drawerSearchSettingsFuzzyOption.getAttribute('data-checked')) === 'true';
}

async function selectSearchMode(page: Page, mode: 'fuzzy' | 'precise', options?: SearchTestsOptions) {
  if (options?.isMobile) {
    await selectSearchModeMobile(page, mode, options);
    return;
  }

  const { selectors } = getSelectors(page, getSelectorOptions(options));
  const isFuzzySelected = await isFuzzySearchModeSelected(page, options);

  if (mode === 'fuzzy' && isFuzzySelected) {
    await validateFuzzyModeSelected(page, options);
    return;
  }

  if (mode === 'precise' && !isFuzzySelected) {
    await validatePreciseModeSelected(page, options);
    return;
  }

  switch (mode) {
    case 'precise': {
      await validateFuzzyModeSelected(page, options);

      await selectors.drawerSearchSettingsPreciseOption.click();
      await validatePreciseModeSelected(page, options);

      break;
    }

    case 'fuzzy': {
      await validatePreciseModeSelected(page, options);

      await selectors.drawerSearchSettingsFuzzyOption.click();
      await validateFuzzyModeSelected(page, options);

      break;
    }

    default:
      break;
  }
}

async function openSearchSettings(page: Page, options?: SearchTestsOptions) {
  const { selectors } = getSelectors(page, getSelectorOptions(options));

  await selectors.drawerSearchInput.click();
  await selectors.drawerSearchSettingsButton.click();

  const fuzzyOption = selectors.drawerSearchSettingsFuzzyOption;
  const preciseOption = selectors.drawerSearchSettingsPreciseOption;

  try {
    await expect(fuzzyOption).toBeVisible({ timeout: 3000 });
    await expect(preciseOption).toBeVisible({ timeout: 3000 });
  } catch {
    await selectors.drawerSearchSettingsButton.click();
    await expect(fuzzyOption).toBeVisible({ timeout: 10000 });
    await expect(preciseOption).toBeVisible({ timeout: 10000 });
  }
}

async function validateQueries(
  page: Page,
  queries: string[],
  expectedResults: EntityConfig['expectedResults'],
  options?: SearchTestsOptions,
) {
  let i = 0;

  for (const query of queries) {
    if (i > 0) {
      await clearSearchQuery(page, options);
    }

    await enterSearchQueryAndValidateResults(
      page,
      {
        searchValue: query,
        expectedResults,
      },
      options,
    );

    i++;
  }
}

async function validateSearchFilterEntity(
  page: Page,
  { queries, expectedResults, openSearchSelector, isMobile }: EntityConfig,
) {
  const options: SearchTestsOptions = { openSearchSelector, isMobile };

  await openMenuSearch(page, options);
  await validateInitialSearchState(page, options);

  await openSearchSettings(page, options);
  await selectSearchMode(page, 'precise', options);
  await validateQueries(page, queries.precise, expectedResults, options);

  if (queries.fuzzy) {
    await clearSearchQuery(page, options);
    await validateQueries(page, queries.fuzzy, { present: [] }, options);

    await openSearchSettings(page, options);
    await selectSearchMode(page, 'fuzzy', options);

    const allQueries = [...queries.precise, ...queries.fuzzy];
    await clearSearchQuery(page, options);
    await validateQueries(page, allQueries, expectedResults, options);
  }
}

export function searchTests(options: SearchTestsOptions = {}) {
  test('drawer menu > search should work by group title', async ({ page }) => {
    await validateSearchFilterEntity(page, {
      ...options,
      queries: {
        precise: ['Разработка'],
        fuzzy: ['hfphf,jnrf', 'разботка'],
      },
      expectedResults: {
        present: [Result.ApiGateway, Result.ServerlessFunctions],
      },
    });
  });

  test('drawer menu > search should work by item title', async ({ page }) => {
    await validateSearchFilterEntity(page, {
      ...options,
      queries: {
        precise: ['vpc'],
        fuzzy: ['мзс', 'vipc'],
      },
      expectedResults: {
        present: [Result.Vpc],
      },
    });
  });

  test('drawer menu > search should work by alias', async ({ page }) => {
    await validateSearchFilterEntity(page, {
      ...options,
      queries: {
        precise: ['ml finetuning'],
        fuzzy: ['lora', 'дщкф', 'lpra'],
      },
      expectedResults: {
        present: [Result.FineTuning],
      },
    });
  });

  test('drawer menu > search should not show false positive results', async ({ page }) => {
    await validateSearchFilterEntity(page, {
      ...options,
      queries: {
        precise: ['asdfgb'],
      },
      expectedResults: {
        present: [],
      },
    });
  });

  if (options?.isMobile) {
    test('drawer menu > search state and results should be reset once menu drawer is reopened', async ({ page }) => {
      const { selectors } = getSelectors(page, getSelectorOptions(options));

      await validateSearchFilterEntity(page, {
        ...options,
        queries: { precise: ['вирт'] },
        expectedResults: {
          present: [Result.VirtualMachines],
          missing: [Result.Images],
        },
      });

      await selectors.drawerCloseButton.click();

      await openMenuSearch(page, options);

      const searchInputValue = await selectors.drawerSearchInput.inputValue();

      if (searchInputValue) {
        if (await selectors.drawerSearchClearButton.isVisible()) {
          await selectors.drawerSearchClearButton.click();
        } else {
          await selectors.drawerSearchInput.clear();
        }
      }

      await validateInitialSearchState(page, options);
    });
  }
}

const ADMIN_SERVICES_GROUP_ID = 'adminServices';
const ADMIN_SERVICES_GROUP_LABEL = 'Административные сервисы';

const ADMIN_SERVICE_CARDS = [
  { id: 'monitoring', label: 'Мониторинг' },
  { id: 'costControl', label: 'Контроль затрат' },
  { id: 'administration', label: 'Администрирование' },
  { id: 'users', label: 'Пользователи' },
  { id: 'support', label: 'Поддержка' },
  { id: 'documentation', label: 'Документация' },
] as const;

const ALL_ADMIN_CARD_IDS = ADMIN_SERVICE_CARDS.map(({ id }) => id);

async function validateAdminServicesHidden(page: Page, options?: SearchTestsOptions) {
  const { getDrawerMenuCard, getDrawerMenuItem } = getSelectors(page, getSelectorOptions(options));

  await expect(getDrawerMenuCard(ADMIN_SERVICES_GROUP_ID)).not.toBeVisible();

  for (const { id } of ADMIN_SERVICE_CARDS) {
    await expect(getDrawerMenuItem(id)).not.toBeVisible();
  }
}

async function validateAdminServicesGroupVisible(page: Page, options?: SearchTestsOptions) {
  const { getDrawerMenuCard, getDrawerMenuSearchResultGroupByText } = getSelectors(page, getSelectorOptions(options));

  await expect(getDrawerMenuCard(ADMIN_SERVICES_GROUP_ID)).toBeVisible();
  await expect(getDrawerMenuSearchResultGroupByText(ADMIN_SERVICES_GROUP_LABEL)).toBeVisible();
}

async function validateAdminServiceCardsVisible(page: Page, cardIds: readonly string[], options?: SearchTestsOptions) {
  const { getDrawerMenuItemInGroup } = getSelectors(page, getSelectorOptions(options));

  for (const cardId of cardIds) {
    const card = ADMIN_SERVICE_CARDS.find(({ id }) => id === cardId);

    if (!card) {
      throw new Error(`Unknown admin service card id: ${cardId}`);
    }

    await expect(getDrawerMenuItemInGroup(ADMIN_SERVICES_GROUP_ID, cardId)).toBeVisible();
  }
}

async function validateAdminServiceCardsHidden(page: Page, cardIds: readonly string[], options?: SearchTestsOptions) {
  const { getDrawerMenuItemInGroup } = getSelectors(page, getSelectorOptions(options));

  for (const cardId of cardIds) {
    await expect(getDrawerMenuItemInGroup(ADMIN_SERVICES_GROUP_ID, cardId)).not.toBeVisible();
  }
}

async function ensureSearchMode(page: Page, mode: 'fuzzy' | 'precise', options?: SearchTestsOptions) {
  await openSearchSettings(page, options);
  await selectSearchMode(page, mode, options);
}

async function validateAdminSearchWithMode(
  page: Page,
  {
    searchValue,
    mode,
    presentCardIds,
    isMobile,
    openSearchSelector,
  }: {
    searchValue: string;
    mode: 'fuzzy' | 'precise';
    presentCardIds: readonly string[];
    isMobile?: boolean;
    openSearchSelector?: Locator;
  },
) {
  const options: SearchTestsOptions = { isMobile, openSearchSelector };

  await openMenuSearch(page, options);
  await ensureSearchMode(page, mode, options);
  await enterSearchQuery(page, searchValue, options);

  const { getDrawerMenuCard } = getSelectors(page, getSelectorOptions(options));
  await expect(getDrawerMenuCard(ADMIN_SERVICES_GROUP_ID)).toBeVisible({ timeout: 15000 });

  await validateAdminServicesGroupVisible(page, options);
  await validateAdminServiceCardsVisible(page, presentCardIds, options);

  const missingCardIds = ALL_ADMIN_CARD_IDS.filter(id => !presentCardIds.includes(id));
  await validateAdminServiceCardsHidden(page, missingCardIds, options);
}

const CLOUD_PRODUCTS_PLATFORMS_GROUP_ID = 'cloudProductsPlatforms';
const CLOUD_PRODUCTS_PLATFORMS_GROUP_LABEL = 'Облачные продукты';
const OTHER_PRODUCTS_PLATFORMS_GROUP_ID = 'otherProductsPlatforms';

const PLATFORM_GROUP_CARD_IDS: Record<string, readonly string[]> = {
  [CLOUD_PRODUCTS_PLATFORMS_GROUP_ID]: ['evolutionPlatform', 'advancedPlatform', 'vmWarePlatform'],
  [OTHER_PRODUCTS_PLATFORMS_GROUP_ID]: ['partnerPlatform', 'marketplacePlatform'],
};

const PLATFORM_CARDS = [
  { id: 'evolutionPlatform', label: 'Evolution' },
  { id: 'advancedPlatform', label: 'Advanced' },
  { id: 'vmWarePlatform', label: 'Облако VMware' },
  { id: 'partnerPlatform', label: 'Партнерский кабинет' },
  { id: 'marketplacePlatform', label: 'Маркетплейс' },
] as const;

async function validatePlatformGroupsHidden(page: Page, options?: SearchTestsOptions) {
  const { getDrawerMenuCard, getDrawerMenuItem } = getSelectors(page, getSelectorOptions(options));

  await expect(getDrawerMenuCard(CLOUD_PRODUCTS_PLATFORMS_GROUP_ID)).not.toBeVisible();
  await expect(getDrawerMenuCard(OTHER_PRODUCTS_PLATFORMS_GROUP_ID)).not.toBeVisible();

  for (const { id } of PLATFORM_CARDS) {
    await expect(getDrawerMenuItem(id)).not.toBeVisible();
  }
}

async function validatePlatformsGroupVisible(
  page: Page,
  groupId: string,
  groupLabel: string,
  options?: SearchTestsOptions,
) {
  const { getDrawerMenuCard, getDrawerMenuSearchResultGroupByText } = getSelectors(page, getSelectorOptions(options));

  await expect(getDrawerMenuCard(groupId)).toBeVisible();
  await expect(getDrawerMenuSearchResultGroupByText(groupLabel)).toBeVisible();
}

async function validatePlatformCardsVisible(
  page: Page,
  groupId: string,
  cardIds: readonly string[],
  options?: SearchTestsOptions,
) {
  const { getDrawerMenuItemInGroup } = getSelectors(page, getSelectorOptions(options));

  for (const cardId of cardIds) {
    const card = PLATFORM_CARDS.find(({ id }) => id === cardId);

    if (!card) {
      throw new Error(`Unknown platform card id: ${cardId}`);
    }

    await expect(getDrawerMenuItemInGroup(groupId, cardId)).toBeVisible();
  }
}

async function validatePlatformCardsHidden(
  page: Page,
  groupId: string,
  cardIds: readonly string[],
  options?: SearchTestsOptions,
) {
  const { getDrawerMenuItemInGroup } = getSelectors(page, getSelectorOptions(options));

  for (const cardId of cardIds) {
    await expect(getDrawerMenuItemInGroup(groupId, cardId)).not.toBeVisible();
  }
}

async function getVisibleSearchGroupCardIds(page: Page, options?: SearchTestsOptions): Promise<string[]> {
  const { selectors } = getSelectors(page, getSelectorOptions(options));
  const cards = selectors.drawer.locator('[data-test-id^="header__drawer-menu__group-card-"]');
  const count = await cards.count();
  const prefix = 'header__drawer-menu__group-card-';
  const groupIds: string[] = [];

  for (let index = 0; index < count; index++) {
    const testId = await cards.nth(index).getAttribute('data-test-id');

    if (testId?.startsWith(prefix)) {
      groupIds.push(testId.slice(prefix.length));
    }
  }

  return groupIds;
}

async function validatePlatformSearchWithMode(
  page: Page,
  {
    searchValue,
    mode,
    groupId,
    groupLabel,
    presentCardIds,
    isMobile,
    openSearchSelector,
  }: {
    searchValue: string;
    mode: 'fuzzy' | 'precise';
    groupId: string;
    groupLabel: string;
    presentCardIds: readonly string[];
    isMobile?: boolean;
    openSearchSelector?: Locator;
  },
) {
  const options: SearchTestsOptions = { isMobile, openSearchSelector };

  await openMenuSearch(page, options);
  await ensureSearchMode(page, mode, options);
  await enterSearchQuery(page, searchValue, options);

  const { getDrawerMenuCard } = getSelectors(page, getSelectorOptions(options));
  await expect(getDrawerMenuCard(groupId)).toBeVisible({ timeout: 15000 });
  await validatePlatformsGroupVisible(page, groupId, groupLabel, options);
  await validatePlatformCardsVisible(page, groupId, presentCardIds, options);

  const groupCardIds = PLATFORM_GROUP_CARD_IDS[groupId] ?? [];
  const missingCardIds = groupCardIds.filter(id => !presentCardIds.includes(id));
  await validatePlatformCardsHidden(page, groupId, missingCardIds, options);
}

export function platformSearchTests(options: SearchTestsOptions = {}) {
  test('drawer menu > platforms groups should be hidden when search is empty', async ({ page }) => {
    await openMenuSearch(page, options);

    await expect(getSelectors(page, getSelectorOptions(options)).selectors.drawerSearchInput).toHaveValue('');
    await validatePlatformGroupsHidden(page, options);
  });

  test('drawer menu > platforms search should work by card label (precise)', async ({ page }) => {
    await validatePlatformSearchWithMode(page, {
      ...options,
      searchValue: 'маркет',
      mode: 'precise',
      groupId: OTHER_PRODUCTS_PLATFORMS_GROUP_ID,
      groupLabel: 'Другие продукты',
      presentCardIds: ['marketplacePlatform'],
    });
  });

  test('drawer menu > platforms search should work by card alias (fuzzy)', async ({ page }) => {
    await validatePlatformSearchWithMode(page, {
      ...options,
      searchValue: 'вмваре',
      mode: 'fuzzy',
      groupId: CLOUD_PRODUCTS_PLATFORMS_GROUP_ID,
      groupLabel: CLOUD_PRODUCTS_PLATFORMS_GROUP_LABEL,
      presentCardIds: ['vmWarePlatform'],
    });
  });

  test('drawer menu > platforms search should work by group label (precise)', async ({ page }) => {
    await validatePlatformSearchWithMode(page, {
      ...options,
      searchValue: 'облач',
      mode: 'precise',
      groupId: CLOUD_PRODUCTS_PLATFORMS_GROUP_ID,
      groupLabel: CLOUD_PRODUCTS_PLATFORMS_GROUP_LABEL,
      presentCardIds: ['evolutionPlatform', 'advancedPlatform', 'vmWarePlatform'],
    });
  });

  test('drawer menu > platforms search results should be below services and above admin', async ({ page }) => {
    await openMenuSearch(page, options);
    await ensureSearchMode(page, 'fuzzy', options);
    await enterSearchQuery(page, 'а', options);

    const groupIds = await getVisibleSearchGroupCardIds(page, options);

    const cloudIndex = groupIds.indexOf(CLOUD_PRODUCTS_PLATFORMS_GROUP_ID);
    const adminIndex = groupIds.indexOf(ADMIN_SERVICES_GROUP_ID);

    expect(groupIds.length).toBeGreaterThan(2);
    expect(cloudIndex).toBeGreaterThan(0);
    expect(cloudIndex).toBeLessThan(adminIndex);
    expect(adminIndex).toBe(groupIds.length - 1);
  });
}

export function adminSearchTests(options: SearchTestsOptions = {}) {
  test('drawer menu > admin services should be hidden when search is empty', async ({ page }) => {
    await openMenuSearch(page, options);

    await expect(getSelectors(page, getSelectorOptions(options)).selectors.drawerSearchInput).toHaveValue('');
    await validateAdminServicesHidden(page, options);
  });

  test('drawer menu > admin services search should work by card label (precise)', async ({ page }) => {
    await validateAdminSearchWithMode(page, {
      ...options,
      searchValue: 'монит',
      mode: 'precise',
      presentCardIds: ['monitoring'],
    });
  });

  test('drawer menu > admin services search should work by card label (fuzzy)', async ({ page }) => {
    await validateAdminSearchWithMode(page, {
      ...options,
      searchValue: 'мниторинг',
      mode: 'fuzzy',
      presentCardIds: ['monitoring'],
    });
  });

  test('drawer menu > admin services search should work by group label (precise)', async ({ page }) => {
    await validateAdminSearchWithMode(page, {
      ...options,
      searchValue: 'админ',
      mode: 'precise',
      presentCardIds: ALL_ADMIN_CARD_IDS,
    });
  });

  test('drawer menu > admin services search should work by group label (fuzzy)', async ({ page }) => {
    await validateAdminSearchWithMode(page, {
      ...options,
      searchValue: 'адмн',
      mode: 'fuzzy',
      presentCardIds: ALL_ADMIN_CARD_IDS,
    });
  });
}
