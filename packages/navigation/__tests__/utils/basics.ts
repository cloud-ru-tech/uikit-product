import { expectItemToBeActive, expectToHaveItemTexts } from './expects';
import { getBackButton, getHoverMenu, getItemById, getItems } from './selectors';
import { firstLevelTexts, itemIds, secondLevelTexts } from './testData';

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
      await t.expect(getHoverMenu().visible).notOk();
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
}
