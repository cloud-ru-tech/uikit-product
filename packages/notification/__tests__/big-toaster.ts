import { fixture, Selector, test } from 'testcafe';

import { NotificationBigProps } from '@sbercloud/uikit-product-notification';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { NOTIFICATION_BIG_TEST_IDS } from '../src/testIds';

const Status = ['Info', 'Success', 'Warning', 'WarningCritical', 'WarningAlarm', 'Error', 'ErrorAlarm'] as Array<
  NotificationBigProps['status']
>;

function getPage(props?: Partial<NotificationBigProps>) {
  return getTestcafeUrl({
    group: 'notification',
    name: 'notification-big',
    props: {
      'data-test-id': '',
      ...props,
    },
  });
}

fixture('Toaster big');

for (const status of Object.values(Status)) {
  test.page(getPage({ status, description: 'Test Description' }))(`Without actions status ${status}`, async t => {
    await t.click(Selector(dataTestIdSelector('trigger-notification')));
    await t.hover(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.closeButton)));

    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_BIG_TEST_IDS.main}__${status}`)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.icon)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.closeButton)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.title)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_BIG_TEST_IDS.action}-${0}`)).exists).notOk();
    await t
      .expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.description)).textContent)
      .eql('Test Description');
  });

  test.page(getPage({ status, description: 'Test Description' }))(`Without one action status ${status}`, async t => {
    await t.click(Selector(dataTestIdSelector('trigger-notification-one-action')));
    await t.hover(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.closeButton)));

    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_BIG_TEST_IDS.main}__${status}`)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.icon)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.closeButton)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.title)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_BIG_TEST_IDS.action}-${0}`)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_BIG_TEST_IDS.action}-${1}`)).exists).notOk();
    await t
      .expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.description)).textContent)
      .eql('Test Description');
  });

  test.page(getPage({ status, description: 'Test Description' }))(`Without two actions status ${status}`, async t => {
    await t.click(Selector(dataTestIdSelector('trigger-notification-two-actions')));
    await t.hover(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.closeButton)));

    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_BIG_TEST_IDS.main}__${status}`)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.icon)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.closeButton)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.title)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_BIG_TEST_IDS.action}-${0}`)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_BIG_TEST_IDS.action}-${1}`)).exists).ok();
    await t
      .expect(Selector(dataTestIdSelector(NOTIFICATION_BIG_TEST_IDS.description)).textContent)
      .eql('Test Description');
  });
}
