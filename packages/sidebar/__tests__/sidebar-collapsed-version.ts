import {
  basics,
  expectItemToBeActive,
  expectItemToBeDisabled,
  firstLevelTexts,
  getCollapseButton,
  getItemById,
  getItemPostfixCounterSelectorString,
  getItemPostfixLabelSelectorString,
  getItemPostfixLockedIconSelectorString,
  getItems,
  getItemText,
  getPage,
  getUncollapseButton,
  itemIds,
} from './utils';

fixture('[Navigation]: Sidebar - collapsed version')
  .page(getPage())
  .beforeEach(t => t.click(getCollapseButton()));

test('renders', async t => {
  await t.expect(getItems().count).eql(firstLevelTexts.length);

  await expectItemToBeActive(t, itemIds.defaultActive, true);
  await expectItemToBeDisabled(t, itemIds.disabled, true);

  await t.expect(getItemText().exists).notOk();

  await t.expect(getItemById(itemIds.withLabel).find(getItemPostfixLabelSelectorString()).exists).notOk();
  await t.expect(getItemById(itemIds.withLockedIcon).find(getItemPostfixLockedIconSelectorString()).exists).notOk();
  await t.expect(getItemById(itemIds.withCounter).find(getItemPostfixCounterSelectorString()).exists).notOk();
  await t.expect(getItemById(itemIds.mainArea).find(getItemPostfixCounterSelectorString()).exists).notOk();

  await t.expect(getUncollapseButton().visible).ok();
});

basics(true);
