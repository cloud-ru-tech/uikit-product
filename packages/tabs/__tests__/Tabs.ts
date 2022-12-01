import { ClientFunction, fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

function isInViewport(selector: Selector) {
  const run = ClientFunction(
    () => {
      const element = selector() as unknown as HTMLElement;
      const clientRect = element.getBoundingClientRect();

      return (
        clientRect.top >= 0 &&
        clientRect.left >= 0 &&
        clientRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        clientRect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    { dependencies: { selector } },
  );

  return run();
}

function getActive() {
  return Selector(() => document.activeElement as HTMLElement);
}

function getWrapper() {
  return Selector(dataTestIdSelector('tabs'));
}

function getNavigationListItem(id: string) {
  return Selector(dataTestIdSelector(`tabs__navigation-list-item:${id}`));
}

function getContent(id: string) {
  return Selector(dataTestIdSelector(`tabs__content:${id}`));
}

function isSelected(selector: Selector) {
  return selector.withAttribute('data-selected', 'true').exists;
}

function isDisabled(selector: Selector) {
  return selector.withAttribute('data-disabled', 'true').exists;
}

fixture('Tabs').page(getTestcafeUrl({ name: 'tabs', props: { 'data-test-id': 'tabs' } }));

test('renders correctly', async t => {
  await t.expect(getWrapper().exists).ok();
});

test('syncs selected tab with content', async t => {
  const navigationListItem = getNavigationListItem('id1');
  const content = getContent('id1');

  await t
    .expect(isSelected(navigationListItem))
    .notOk()
    .expect(content.exists)
    .notOk()
    .click(navigationListItem)
    .expect(isSelected(navigationListItem))
    .ok()
    .expect(content.exists)
    .ok();
});

test('prevents disabled tab selection', async t => {
  const navigationListItem = getNavigationListItem('id2');
  const content = getContent('id2');
  const disabledNavigationListItem = getNavigationListItem('id3');
  const disabledContent = getContent('id3');

  await t
    .expect(isSelected(navigationListItem))
    .ok()
    .expect(content.exists)
    .ok()
    .expect(isSelected(disabledNavigationListItem))
    .notOk()
    .expect(disabledContent.exists)
    .notOk()
    .expect(isDisabled(disabledNavigationListItem))
    .ok()
    .click(disabledNavigationListItem)
    .expect(isSelected(navigationListItem))
    .ok()
    .expect(content.exists)
    .ok()
    .expect(isSelected(disabledNavigationListItem))
    .notOk()
    .expect(disabledContent.exists)
    .notOk();
});

for (const key of ['Enter', 'Space']) {
  test(`selects focused tab via "${key}" keydown`, async t => {
    const navigationListItem1 = getNavigationListItem('id1');
    const content1 = getContent('id1');
    const navigationListItem2 = getNavigationListItem('id2');
    const content2 = getContent('id2');

    await t
      .expect(isSelected(navigationListItem2))
      .ok()
      .expect(content2.exists)
      .ok()
      .expect(isSelected(navigationListItem1))
      .notOk()
      .expect(content1.exists)
      .notOk()
      .pressKey('tab')
      .dispatchEvent(getActive(), 'keydown', { code: key, bubbles: true })
      .expect(isSelected(navigationListItem2))
      .notOk()
      .expect(content2.exists)
      .notOk()
      .expect(isSelected(navigationListItem1))
      .ok()
      .expect(content1.exists)
      .ok();
  });
}

test('does not select focused tab via letters keydown', async t => {
  const navigationListItem1 = getNavigationListItem('id1');
  const content1 = getContent('id1');
  const navigationListItem2 = getNavigationListItem('id2');
  const content2 = getContent('id2');

  await t
    .expect(isSelected(navigationListItem2))
    .ok()
    .expect(content2.exists)
    .ok()
    .expect(isSelected(navigationListItem1))
    .notOk()
    .expect(content1.exists)
    .notOk()
    .pressKey('tab')
    .pressKey('A a B b C c D d E e F f G g H h I i J j K k L l M m N n O o P p Q q R r S s T t U u V v W w X x Y y Z z')
    .expect(isSelected(navigationListItem2))
    .ok()
    .expect(content2.exists)
    .ok()
    .expect(isSelected(navigationListItem1))
    .notOk()
    .expect(content1.exists)
    .notOk();
});

test.skip('scroll tabs on selected change', async t => {
  const navigationListItem2 = getNavigationListItem('id2');
  const navigationListItem11 = getNavigationListItem('id11');
  const navigationListItem16 = getNavigationListItem('id16');

  await t
    .expect(isInViewport(navigationListItem16))
    .notOk()
    .click(navigationListItem11)
    .expect(isInViewport(navigationListItem16))
    .ok()
    .click(navigationListItem2)
    .expect(isInViewport(navigationListItem16))
    .notOk();
});

test('move tabs on mouse scroll', async t => {
  const navigationListItem1 = getNavigationListItem('id1');
  const navigationListItem8 = getNavigationListItem('id8');
  const navigationListItem18 = getNavigationListItem('id18');

  await t.expect(isInViewport(navigationListItem1)).ok();
  await t.expect(isInViewport(navigationListItem18)).notOk();

  await t.hover(navigationListItem8).scroll(getWrapper().find('div'), 700, 0);

  await t.expect(isInViewport(navigationListItem1)).notOk();
  await t.expect(isInViewport(navigationListItem18)).ok();
});

test('move tabs on drag', async t => {
  const navigationListItem1 = getNavigationListItem('id1');
  const navigationListItem8 = getNavigationListItem('id8');
  const navigationListItem18 = getNavigationListItem('id18');

  await t.expect(isInViewport(navigationListItem1)).ok();
  await t.expect(isInViewport(navigationListItem18)).notOk();

  await t.click(navigationListItem8).drag(navigationListItem8, -700, 0);

  await t.expect(isInViewport(navigationListItem1)).notOk();
  await t.expect(isInViewport(navigationListItem18)).ok();
});
