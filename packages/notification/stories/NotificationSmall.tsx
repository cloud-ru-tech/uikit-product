import { Meta, Story } from '@storybook/react/types-6-0';
import { ReactText, useState } from 'react';

import { Button } from '@sbercloud/uikit-product-button';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  NotificationSmallProps,
  NotificationStatuses,
  NotificationType,
  openNotification,
  updateNotification,
} from '../src';
import { NotificationSmall } from '../src/components/NotificationSmall';

export default {
  title: 'Components/Notification/Notification Small',
  component: NotificationSmall,
} as Meta;

const Template: Story<NotificationSmallProps> = ({ ...args }) => {
  const [currentNotificationId, setNotificationId] = useState<ReactText>();

  const clickToOpen = async () => {
    const id = await openNotification({
      type: NotificationType.Small,
      notificationProps: args,
    });

    setNotificationId(id);
  };

  const clickToUpdate = () => {
    if (!currentNotificationId) return;

    updateNotification(currentNotificationId, {
      type: NotificationType.Small,
      notificationProps: {
        ...args,
        text: 'updated text',
        status: NotificationStatuses[NotificationType.Small].Error,
      },
      notificationOptions: {
        onClose: () => setNotificationId(undefined),
      },
    });
  };

  return (
    <>
      <Button data-test-id='trigger-notification' onClick={clickToOpen} text={`Open ${args.status} notification`} />

      <br />
      <br />

      <Button
        data-test-id='update-notification'
        onClick={clickToUpdate}
        text={`Update notification to ${NotificationStatuses[NotificationType.Small].Error}`}
      />
    </>
  );
};

export const notificationSmall = Template.bind({});
notificationSmall.args = {
  status: NotificationStatuses[NotificationType.Small].Success,
  text: 'Перенос данных завершен',
};
notificationSmall.argTypes = {
  status: {
    options: Object.values(NotificationStatuses[NotificationType.Small]),
    control: {
      type: 'radio',
    },
  },
  text: {
    control: {
      type: 'text',
    },
  },
};
notificationSmall.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=54187%3A258059',
  },
  badges: [BADGE.STABLE],
};
