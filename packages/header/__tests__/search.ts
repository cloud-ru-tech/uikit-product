import { test } from 'testcafe';

import { getDrawerMenuSearchResultGroupByText, getDrawerMenuSearchResultLinkByText, selectors } from './selectors';

type ExpectedSearchResultItem = {
  groupLabel: string;
  linkLabel: string;
};

type SearchMenuItemConfig = {
  searchValue: string;
  expectedResults: [ExpectedSearchResultItem, ...ExpectedSearchResultItem[]];
};

const EXPECTED_RESULTS = {
  virtualMachines: { groupLabel: 'Инфраструктура', linkLabel: 'Виртуальные машины' },
  apiGateway: { groupLabel: 'Разработка', linkLabel: 'API gateway' },
  serverlessFunctions: { groupLabel: 'Разработка', linkLabel: 'Serverless functions' },
  vpc: { groupLabel: 'Сеть', linkLabel: 'VPC' },
  fineTuning: { groupLabel: 'ML/AI инструменты', linkLabel: 'ML Finetuning' },
};

const ALL_AVAILABLE_LINKS = Object.values(EXPECTED_RESULTS);

type EntityConfig = {
  queries: [string, string, string];
  expectedResults: SearchMenuItemConfig['expectedResults'];
  openSearchSelector?: Selector;
};

async function openMenuSearch(t: TestController, openSearchSelector?: Selector) {
  const { drawerMenuButton } = selectors;

  await t.click(drawerMenuButton);

  if (openSearchSelector) {
    await t.click(openSearchSelector);
  }
}

async function validateSearchFilterResult(t: TestController, { groupLabel, linkLabel }: ExpectedSearchResultItem) {
  await t.expect(getDrawerMenuSearchResultGroupByText(groupLabel).exists).ok('Group label is missing');
  await t.expect(getDrawerMenuSearchResultLinkByText(linkLabel).exists).ok('Card link is missing');
}

async function enterSearchQueryAndFindMenuItem(
  t: TestController,
  { searchValue, expectedResults }: SearchMenuItemConfig,
) {
  const { drawerSearchInput } = selectors;

  await t.typeText(drawerSearchInput, searchValue);
  for (const result of expectedResults) {
    await validateSearchFilterResult(t, result);
  }
}

async function clearSearchQuery(t: TestController) {
  const { drawerSearchClearButton, drawerSearchInput } = selectors;

  await t.click(drawerSearchClearButton);
  await t.expect(drawerSearchInput.textContent).eql('');
  await t
    .expect(drawerSearchClearButton.exists)
    .notOk('Clear button is present, but must disappear after clearing input');

  for (const linkCard of ALL_AVAILABLE_LINKS) {
    await validateSearchFilterResult(t, linkCard);
  }
}

async function validateSearchFilterEntity(t: TestController, { queries, expectedResults }: EntityConfig) {
  await openMenuSearch(t);

  let i = 0;

  for (const query of queries) {
    if (i > 0) {
      await clearSearchQuery(t);
    }

    await enterSearchQueryAndFindMenuItem(t, {
      searchValue: query,
      expectedResults,
    });

    i++;
  }
}

export function searchTests(openSearchSelector?: Selector) {
  test('drawer menu > search should work by group title', async t => {
    await validateSearchFilterEntity(t, {
      queries: ['Разработка', 'hfphf,jnrf', 'разботка'],
      expectedResults: [EXPECTED_RESULTS.apiGateway, EXPECTED_RESULTS.serverlessFunctions],
      openSearchSelector,
    });
  });

  test('drawer menu > search should work by item title', async t => {
    await validateSearchFilterEntity(t, {
      queries: ['vpc', 'мзс', 'vipc'],
      expectedResults: [EXPECTED_RESULTS.vpc],
      openSearchSelector,
    });
  });

  test('drawer menu > search should work by alias', async t => {
    await validateSearchFilterEntity(t, {
      queries: ['lora', 'дщкф', 'lpra'],
      expectedResults: [EXPECTED_RESULTS.fineTuning],
      openSearchSelector,
    });
  });
}
