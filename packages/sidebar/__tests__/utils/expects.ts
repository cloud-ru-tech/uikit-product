import { Selector } from 'testcafe';

import { isElementVisible } from './isElementVisible';
import { getItemById, getItemIconSelectorString, getItemTextSelectorString } from './selectors';
import { activeColor, disabledIconColor, disabledTextColor } from './testData';

export async function expectItemToBeActive(t: TestController, id: string, isCollapsed = false) {
  const item = await getItemById(id);

  if (!isCollapsed) {
    await t.expect(item.hasAttribute('data-active')).ok();
  }

  await t.expect(item.find(getItemIconSelectorString()).find('svg').getStyleProperty('fill')).eql(activeColor);

  if (isCollapsed) {
    await t.expect(item.find(getItemIconSelectorString()).hasAttribute('data-active')).ok();
  } else {
    await t.expect(item.find(getItemTextSelectorString()).getStyleProperty('color')).eql(activeColor);
  }
}

export async function expectItemToBeDisabled(t: TestController, id: string, isCollapsed = false) {
  const item = await getItemById(id);

  await t.expect(item.hasAttribute('data-disabled')).ok();
  await t.expect(item.find(getItemIconSelectorString()).find('svg').getStyleProperty('fill')).eql(disabledIconColor);

  if (isCollapsed) {
    await t.expect(item.find(getItemIconSelectorString()).hasAttribute('data-disabled')).ok();
  } else {
    await t.expect(item.find(getItemTextSelectorString()).getStyleProperty('color')).eql(disabledTextColor);
  }
}

export async function expectToHaveItemTexts(t: TestController, texts: string[]) {
  const collection = await Selector(getItemTextSelectorString()).filter(isElementVisible);

  await t.expect(collection.count).eql(texts.length);

  for (let i = 0; i < texts.length; i++) {
    await t.expect(collection.nth(i).textContent).eql(texts[i]);
  }
}
