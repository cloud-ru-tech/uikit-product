import { fixture, Selector, test } from 'testcafe';

import { NotificationSmallProps } from '@sbercloud/uikit-product-notification';

import { dataTestIdSelector, getTestcafeUrl } from '../../../testcafe/utils';
import { NOTIFICATION_SMALL_TEST_IDS } from '../src/testIds';

const Status = ['Success', 'Error', 'Neutral', 'Loading'] as Array<NotificationSmallProps['status']>;

function getPage(props?: Partial<NotificationSmallProps>) {
  return getTestcafeUrl({
    group: 'notification',
    name: 'notification-small',
    props: {
      'data-test-id': '',
      ...props,
    },
  });
}

fixture('Toaster small');
for (const status of Status) {
  test.page(getPage({ status, text: 'Test' }))(`Without actions status ${status}`, async t => {
    await t.click(Selector(dataTestIdSelector('trigger-notification')));
    await t.hover(Selector(dataTestIdSelector(`${NOTIFICATION_SMALL_TEST_IDS.main}__${status}`)));

    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_SMALL_TEST_IDS.main}__${status}`)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_SMALL_TEST_IDS.text)).textContent).eql('Test');
    if (status !== 'Neutral') {
      await t.expect(Selector(dataTestIdSelector(NOTIFICATION_SMALL_TEST_IDS.icon)).exists).ok();
    }

    await t.click(Selector(dataTestIdSelector('update-notification')));
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_SMALL_TEST_IDS.text)).textContent).eql('updated text');
    await t.hover(Selector(dataTestIdSelector(`${NOTIFICATION_SMALL_TEST_IDS.main}__Error`)));
  });

  test.page(getPage({ status, text: 'Test' }))(`With actions status ${status}`, async t => {
    await t.setNativeDialogHandler(() => '');

    await t.click(Selector(dataTestIdSelector('trigger-notification-with-action')));
    await t.hover(Selector(dataTestIdSelector(`${NOTIFICATION_SMALL_TEST_IDS.main}__${status}`)));

    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_SMALL_TEST_IDS.main}__${status}`)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_SMALL_TEST_IDS.action)).exists).ok();
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_SMALL_TEST_IDS.text)).textContent).eql('Test');
    if (status !== 'Neutral') {
      await t.expect(Selector(dataTestIdSelector(NOTIFICATION_SMALL_TEST_IDS.icon)).exists).ok();
    }

    await t.click(Selector(dataTestIdSelector(NOTIFICATION_SMALL_TEST_IDS.action)));
    const dialogHistory = await t.getNativeDialogHistory();
    await t.expect(dialogHistory[0].text).contains('Clicked!');

    await t.wait(500);
    await t.click(Selector(dataTestIdSelector('trigger-notification-with-action')));
    await t.expect(Selector(dataTestIdSelector(`${NOTIFICATION_SMALL_TEST_IDS.main}__${status}`)).exists).ok();

    await t.click(Selector(dataTestIdSelector('update-notification')));
    await t.expect(Selector(dataTestIdSelector(NOTIFICATION_SMALL_TEST_IDS.text)).textContent).eql('updated text');
    await t.hover(Selector(dataTestIdSelector(`${NOTIFICATION_SMALL_TEST_IDS.main}__Error`)));
  });
}
