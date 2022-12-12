import { Selector } from 'testcafe';

import {
  activeColor,
  expectItemToBeActive,
  getCollapseButton,
  getHoverMenu,
  getHoverMenuItemById,
  getHoverMenuItemTextSelectorString,
  getItemById,
  getItemPostfixCounterSelectorString,
  getItemPostfixLabelSelectorString,
  getItemPostfixLockedIconSelectorString,
  getPage,
  getUncollapseButton,
  itemIds,
} from './utils';

fixture('[Navigation]: Sidebar - hover menu')
  .skipJsErrors(args => Boolean(args?.message.includes('ResizeObserver loop')))
  .page(getPage())
  .beforeEach(t => t.click(getCollapseButton()));

test('renders', async t => {
  const verifyItem = async (id: string, innerChecker: (selector: Selector) => Promise<void>) => {
    await t.hover(getItemById(id));
    await t.expect(getHoverMenu().exists).ok();
    await innerChecker(getHoverMenuItemById(id));
    await t.hover('body');
    await t.expect(getHoverMenu().exists).notOk();
  };

  await verifyItem(itemIds.defaultActive, selector =>
    t.expect(selector.find(getHoverMenuItemTextSelectorString()).getStyleProperty('color')).eql(activeColor),
  );
  await verifyItem(itemIds.withLabel, selector =>
    t.expect(selector.find(getItemPostfixLabelSelectorString()).visible).ok(),
  );
  await verifyItem(itemIds.withLockedIcon, selector =>
    t.expect(selector.find(getItemPostfixLockedIconSelectorString()).visible).ok(),
  );
  await verifyItem(itemIds.withCounter, selector =>
    t.expect(selector.find(getItemPostfixCounterSelectorString()).textContent).eql('3'),
  );
  await verifyItem(itemIds.mainArea, selector =>
    t.expect(selector.find(getItemPostfixCounterSelectorString()).textContent).eql('5'),
  );
});

test('selects item on the top level', async t => {
  await t.hover(getItemById(itemIds.mainArea));
  await t.click(getHoverMenuItemById(itemIds.mainArea));

  await t.expect(getHoverMenu().exists).notOk();
  await expectItemToBeActive(t, itemIds.mainArea, true);
});

test('navigates to the inner level', async t => {
  await t.hover(getItemById(itemIds.slide));
  await t.click(getHoverMenuItemById(itemIds.slide));

  await t.expect(getHoverMenu().exists).notOk();
  await expectItemToBeActive(t, itemIds.slide, true);
});

test("doesn't select disabled item", async t => {
  await t.hover(getItemById(itemIds.disabled));

  await t.expect(getHoverMenu().exists).notOk();
});

test('selects item in the accordion', async t => {
  await t.hover(getItemById(itemIds.slide));
  await t.click(getHoverMenuItemById(itemIds.slide));
  await t.hover(getItemById(itemIds.accordion1));
  await t.click(getHoverMenuItemById(itemIds.accordionThirdLevelChild1));

  await t.expect(getHoverMenu().exists).notOk();
  await expectItemToBeActive(t, itemIds.accordion1, true);

  await t.hover(getItemById(itemIds.accordion1));

  await t
    .expect(
      getHoverMenuItemById(itemIds.accordionThirdLevelChild1)
        .find(getHoverMenuItemTextSelectorString())
        .getStyleProperty('color'),
    )
    .eql(activeColor);

  await t.click(getUncollapseButton());

  await expectItemToBeActive(t, itemIds.accordionThirdLevelChild1);
});
