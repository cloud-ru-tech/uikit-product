import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-product-button';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  NotificationBigProps,
  NotificationStatuses,
  NotificationType,
  openNotification,
  updateNotification,
} from '../src';
import { NotificationBig } from '../src/components/NotificationBig';

export default {
  title: 'Components/Notification/Notification Big',
  component: NotificationBig,
} as Meta;

const Block = styled.div`
  margin-bottom: 8px;

  > button + button {
    margin-left: 20px;
  }
`;

const CustomNotificationWrap = styled.div`
  display: flex;
  border: 1px solid;
  padding: 11px 27px 11px 11px;
  border-radius: 8px;
  position: relative;
  cursor: default;
`;

const actions: NotificationBigProps['actions'] = [
  {
    text: 'Принять',
    onClick: (_, close) => {
      close?.();
    },
  },
  {
    text: 'Отменить',
    onClick: (_, close) => {
      alert('Cancelled!');
      close?.();
    },
  },
];

const CustomNotification = ({ text }: { text: string }) => <CustomNotificationWrap>{text}</CustomNotificationWrap>;

const Template: Story<NotificationBigProps> = ({ ...args }) => {
  const notification = (actions?: NotificationBigProps['actions']) => {
    openNotification({
      type: NotificationType.Big,
      notificationProps: { ...args, actions },
      notificationOptions: {
        id: actions?.length || 'test',
      },
    });
  };

  const updateNotificationWithTwoActions = (actions: NotificationBigProps['actions']) => {
    updateNotification(actions?.length || 'test', {
      type: NotificationType.Big,
      notificationProps: {
        ...args,
        title: 'Обновлен',
        description: 'Новый текст',
        actions,
        status: NotificationStatuses[NotificationType.Big].Success,
      },
    });
  };

  const customNotification = () => {
    openNotification({
      type: NotificationType.Big,
      notificationOptions: {
        id: 'customNotification',
      },
      customNotification: <CustomNotification text={'Это кастомное уведомление'} />,
    });
  };

  const updateCustomNotification = () => {
    updateNotification('customNotification', {
      type: NotificationType.Big,
      customNotification: <CustomNotification text={'Это обновленное кастомное уведомление'} />,
    });
  };

  return (
    <>
      <Block>
        <Button
          data-test-id='trigger-notification'
          onClick={() => notification()}
          text={`Open ${args.status} notification`}
        />
      </Block>

      <Block>
        <Button
          data-test-id='trigger-notification-one-action'
          onClick={() => notification([actions[0]])}
          text={`Open ${args.status} notification with one action`}
        />
      </Block>

      <Block>
        <Button
          data-test-id='trigger-notification-two-actions'
          onClick={() => notification(actions)}
          text={`Open ${args.status} notification with multiple actions`}
        />

        <Button
          data-test-id='update-notification-two-actions'
          onClick={() => updateNotificationWithTwoActions(actions)}
          text={`Update ${args.status} notification with multiple actions`}
        />
      </Block>

      <Block>
        <Button
          data-test-id='trigger-custom-notification'
          onClick={customNotification}
          text={`Open custom ${args.status} notification`}
        />

        <Button
          data-test-id='update-custom-notification'
          onClick={updateCustomNotification}
          text={`Update ${args.status} custom notification`}
        />
      </Block>
    </>
  );
};

export const notificationBig = Template.bind({});
notificationBig.args = {
  status: NotificationStatuses[NotificationType.Big].Info,
  title: 'Перенос данных завершен',
  description: 'Привет! После запуска задачи на расчет новой модели посмотри, пожалуйста, что-нибудь еще',
  onCloseClick: undefined,
};
notificationBig.argTypes = {
  status: {
    options: Object.values(NotificationStatuses[NotificationType.Big]),
    control: {
      type: 'radio',
    },
  },
  title: {
    control: {
      type: 'text',
    },
  },
  description: {
    control: {
      type: 'text',
    },
  },
};
notificationBig.parameters = {
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
