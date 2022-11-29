import { fixture, Selector, test } from 'testcafe';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';

const testId = 'notification-panel';
const closeButtonId = 'notification-panel__close-button';
const readAllButtonId = 'notification-panel__read-all-button';
const chipNewId = 'notification-panel__chip-new';
const cardsWrapperId = 'notification-panel__cards-wrapper';
const openNotificationPanelButtonId = 'open-notification-panel-button';
const notificationCardBadgeId = 'notification-card__badge';

const visit = (props?: Partial<{ headerTooltip: string; open: boolean; cardsCount: number }>) =>
  getTestcafeUrl({
    name: 'notification-panel',
    props: {
      'data-test-id': testId,
      ...props,
    },
  });

fixture('Notification Panel');

test.page(visit({ open: false }))(`Open = false`, async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).notOk();
});

test.page(visit({ open: true }))(`First render`, async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).exists).ok();
});

test.page(visit({ cardsCount: 0 }))(`Cards count = 0`, async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).textContent).contains('Нет новых уведомлений');
});

test.page(visit({ open: true, cardsCount: 2 }))(`Render items`, async t => {
  await t.expect(Selector(dataTestIdSelector(testId)).textContent).contains('Event type 0');
  await t.expect(Selector(dataTestIdSelector(testId)).textContent).contains('Event type 1');

  await t.expect(Selector(dataTestIdSelector(cardsWrapperId)).childNodeCount).eql(2);
});

test.page(visit({ open: true }))(`Click close button`, async t => {
  await t.click(Selector(dataTestIdSelector(closeButtonId)));

  await t.expect(Selector(dataTestIdSelector(testId)).exists).notOk();
});

test.page(visit({ open: true, cardsCount: 2 }))(`Click read all button`, async t => {
  await t.click(Selector(dataTestIdSelector(readAllButtonId)));
  await t.click(Selector(dataTestIdSelector(chipNewId)));

  await t.expect(Selector(dataTestIdSelector(testId)).textContent).contains('Нет новых уведомлений');
});

test.page(visit({ open: false, cardsCount: 11 }))(`Hide card notification `, async t => {
  const openButton = Selector(dataTestIdSelector(openNotificationPanelButtonId));
  const closeButton = Selector(dataTestIdSelector(closeButtonId));
  const wrapper = Selector(dataTestIdSelector(cardsWrapperId));

  await t.resizeWindow(1000, 900);

  await t.click(openButton);
  await t.scroll(wrapper, 0, 500).wait(200);
  await t.click(closeButton);
  await t.click(openButton);

  for (const x of [0, 1, 2, 3, 4, 5, 6, 7]) {
    await t.expect(wrapper.child(x).find(dataTestIdSelector(notificationCardBadgeId)).exists).notOk();
  }

  await t.scroll(wrapper, 0, 1000).wait(200);

  for (const x of [8, 9, 10]) {
    await t.expect(wrapper.child(x).find(dataTestIdSelector(notificationCardBadgeId)).exists).ok();
  }
});
