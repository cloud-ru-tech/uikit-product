import {
  basics,
  expectItemToBeActive,
  expectItemToBeDisabled,
  expectToHaveItemTexts,
  filteredTexts,
  firstLevelTexts,
  getCloseSearchButton,
  getCollapseButton,
  getItemById,
  getItemPostfixAccordionButtonSelectorString,
  getItemPostfixCounterSelectorString,
  getItemPostfixLabelSelectorString,
  getItemPostfixLockedIconSelectorString,
  getItems,
  getItemText,
  getOpenSearchButton,
  getPage,
  getSearch,
  getSidebar,
  getUncollapseButton,
  isElementVisible,
  itemIds,
  secondLevelTexts,
} from './utils';

const SIDEBAR_FULL_WIDTH = '255px';
const SIDEBAR_COLLAPSED_WIDTH = '53px';

fixture('[Navigation]: Sidebar - full version')
  .skipJsErrors(args => Boolean(args?.message?.includes('ResizeObserver loop')))
  .page(getPage());

test('renders', async t => {
  await expectToHaveItemTexts(t, firstLevelTexts);
  await expectItemToBeActive(t, itemIds.defaultActive);
  await expectItemToBeDisabled(t, itemIds.disabled);

  await t.expect(getItemById(itemIds.withLabel).find(getItemPostfixLabelSelectorString()).visible).ok();
  await t.expect(getItemById(itemIds.withLockedIcon).find(getItemPostfixLockedIconSelectorString()).visible).ok();
  await t.expect(getItemById(itemIds.withCounter).find(getItemPostfixCounterSelectorString()).textContent).eql('3');
  await t.expect(getItemById(itemIds.mainArea).find(getItemPostfixCounterSelectorString()).textContent).eql('5');

  await t.expect(getCollapseButton().visible).ok();
});

basics(false);

test('selects items in the accordion', async t => {
  const accordionItem = getItemById(itemIds.accordion1);
  await t.click(getItemById(itemIds.slide));
  await t.click(accordionItem);

  await t.expect(accordionItem.find(getItemPostfixAccordionButtonSelectorString()).hasAttribute('data-opened')).ok();

  await t.click(getItemById(itemIds.accordionSecondLevelChild1));

  await expectItemToBeActive(t, itemIds.accordionSecondLevelChild1);

  await t.click(getItemById(itemIds.accordion2));
  await t.click(getItemById(itemIds.accordionSecondLevelChild2));

  await t.expect(accordionItem.find(getItemPostfixAccordionButtonSelectorString()).hasAttribute('data-opened')).notOk();
});

// eslint-disable-next-line testcafe-community/missing-expect
test('searches the items', async t => {
  const searchString = 'da';
  await t.click(getItemById(itemIds.slide));
  await t.click(getOpenSearchButton());
  await t.typeText(getSearch(), searchString);

  await expectToHaveItemTexts(t, filteredTexts);

  await t.click(getCloseSearchButton());

  await expectToHaveItemTexts(t, secondLevelTexts);

  await t.click(getOpenSearchButton());
  await t.typeText(getSearch(), searchString);
  await t.click(getItemById(itemIds.foundBySearch).filter(isElementVisible));

  await expectItemToBeActive(t, itemIds.foundBySearch);
});

test('default open accordion', async t => {
  await t.click(getItemById(itemIds.defaultOpenSlide));

  await t
    .expect(
      getItemById(itemIds.defaultOpenItem)
        .find(getItemPostfixAccordionButtonSelectorString())
        .hasAttribute('data-opened'),
    )
    .ok();
});

test('close default open accordion', async t => {
  const accordionItem = getItemById(itemIds.defaultOpenItem);

  await t.click(getItemById(itemIds.defaultOpenSlide));
  await t.expect(accordionItem.find(getItemPostfixAccordionButtonSelectorString()).hasAttribute('data-opened')).ok();

  await t.click(accordionItem);
  await t.expect(accordionItem.find(getItemPostfixAccordionButtonSelectorString()).hasAttribute('data-opened')).notOk();
});

test('nearby items close default open accordion', async t => {
  const defaultOpenItem = getItemById(itemIds.defaultOpenItem);

  await t.click(getItemById(itemIds.defaultOpenSlide));
  await t.expect(defaultOpenItem.find(getItemPostfixAccordionButtonSelectorString()).hasAttribute('data-opened')).ok();

  await t.click(defaultOpenItem);
  await t
    .expect(defaultOpenItem.find(getItemPostfixAccordionButtonSelectorString()).hasAttribute('data-opened'))
    .notOk();

  await t.click(getItemById(itemIds.defaultOpenItem2));
  await t
    .expect(
      getItemById(itemIds.defaultOpenItem2)
        .find(getItemPostfixAccordionButtonSelectorString())
        .hasAttribute('data-opened'),
    )
    .ok();
  await t.click(getItemById(itemIds.defaultOpenItem3));

  await t
    .expect(defaultOpenItem.find(getItemPostfixAccordionButtonSelectorString()).hasAttribute('data-opened'))
    .notOk();
});

test('collapse/uncollapse sidebar', async t => {
  await t.click(getCollapseButton());

  await t.expect(getSidebar().hasAttribute('data-collapsed')).ok();
  await t.expect(getSidebar().getStyleProperty('width')).eql(SIDEBAR_COLLAPSED_WIDTH);
  await t.expect(getItems().hasAttribute('data-collapsed')).ok();
  await t.expect(getItems().count).eql(firstLevelTexts.length);
  await t.expect(getItemText().exists).notOk();

  await t.click(getUncollapseButton());

  await t.expect(getSidebar().hasAttribute('data-collapsed')).notOk();
  await t.expect(getSidebar().getStyleProperty('width')).eql(SIDEBAR_FULL_WIDTH);
  await t.expect(getItems().hasAttribute('data-collapsed')).notOk();
  await expectToHaveItemTexts(t, firstLevelTexts);
});
