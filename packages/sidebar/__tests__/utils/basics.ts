import { expectItemToBeActive, expectToHaveItemTexts } from './expects';
import { getBackButton, getHoverMenu, getHoverMenuItemById, getItemById, getItems } from './selectors';
import { firstLevelTexts, itemIds, secondLevelTexts, secondSlideInnerItemsTexts } from './testData';

export function basics(isCollapsed: boolean) {
  // eslint-disable-next-line testcafe-community/missing-expect
  test('selects item in the main area', async t => {
    await t.click(getItemById(itemIds.mainArea));

    await expectItemToBeActive(t, itemIds.mainArea, isCollapsed);
  });

  // eslint-disable-next-line testcafe-community/missing-expect
  test('selects item in the footer', async t => {
    await t.click(getItemById(itemIds.footer));

    await expectItemToBeActive(t, itemIds.footer, isCollapsed);
  });

  // eslint-disable-next-line testcafe-community/missing-expect
  test('does not select disabled item', async t => {
    await t.click(getItemById(itemIds.disabled));

    await expectItemToBeActive(t, itemIds.defaultActive, isCollapsed);
  });

  test('navigates between levels', async t => {
    await t.click(getItemById(itemIds.slide));

    await expectItemToBeActive(t, itemIds.slide, isCollapsed);

    if (isCollapsed) {
      // TODO: fails in Chrome (menu is actually visible)
      if (t.browser.name !== 'Chrome') {
        await t.expect(getHoverMenu().visible).notOk();
      }
      await t.expect(getItems().count).eql(secondLevelTexts.length);
    } else {
      await expectToHaveItemTexts(t, secondLevelTexts);
    }

    await t.click(getBackButton());

    if (isCollapsed) {
      await t.expect(getItems().count).eql(firstLevelTexts.length);
    } else {
      await expectToHaveItemTexts(t, firstLevelTexts);
    }
  });

  test('navigates into the second slide item', async t => {
    await t.click(getItemById(itemIds.slide2));

    await expectItemToBeActive(t, itemIds.slide2, isCollapsed);

    if (isCollapsed) {
      await t.expect(getHoverMenu().visible).notOk();
      await t.expect(getItems().count).eql(secondSlideInnerItemsTexts.length);
    } else {
      await expectToHaveItemTexts(t, secondSlideInnerItemsTexts);
    }

    await t.click(getBackButton());

    if (isCollapsed) {
      await t.expect(getItems().count).eql(firstLevelTexts.length);
    } else {
      await expectToHaveItemTexts(t, firstLevelTexts);
    }
  });

  // eslint-disable-next-line testcafe-community/missing-expect
  test('navigates to the root when clicking the header item', async t => {
    await t.click(getItemById(itemIds.slide));

    if (isCollapsed) {
      await t.hover(getItemById(itemIds.accordion2));
      await t.click(getHoverMenuItemById(itemIds.accordionSecondLevelChild2));
      await expectItemToBeActive(t, itemIds.accordion2, true);
    } else {
      await t.click(getItemById(itemIds.accordion2));
      await t.click(getItemById(itemIds.accordionSecondLevelChild2));
      await expectItemToBeActive(t, itemIds.accordionSecondLevelChild2, isCollapsed);
    }

    await t.click(getItemById(itemIds.slide));

    await expectItemToBeActive(t, itemIds.slide, isCollapsed);
  });
}
