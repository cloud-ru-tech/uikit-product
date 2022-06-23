import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-product-button';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { NotificationBigProps, useNotification } from '../src';
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

const actions: NotificationBigProps['actions'] = [
  {
    text: 'Принять',
    onClick: (_, close) => {
      close?.();
    },
  },
  {
    text: 'Отменить',
    onClick: () => {},
  },
];

const Template: Story<NotificationBigProps> = ({ ...args }) => {
  const { openNotification, updateNotification, types, statuses } = useNotification();

  const notification = (actions?: NotificationBigProps['actions']) => {
    openNotification({
      type: types.Big,
      notificationProps: { ...args, actions },
      notificationOptions: {
        id: actions?.length || 'test',
      },
    });
  };

  const updateNotificationWithTwoActions = (actions: NotificationBigProps['actions']) => {
    updateNotification(actions?.length || 'test', {
      type: types.Big,
      notificationProps: {
        ...args,
        title: 'Обновлен',
        description: 'Новый текст',
        actions,
        status: statuses[types.Big].Success,
      },
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
    </>
  );
};

export const notificationBig = Template.bind({});
notificationBig.args = {};
notificationBig.argTypes = {
  status: {
    defaultValue: useNotification.statuses.Big.Info,
    options: Object.values(useNotification.statuses.Big),
    control: {
      type: 'radio',
    },
  },
  title: {
    defaultValue: 'Перенос данных завершен',
    control: {
      type: 'text',
    },
  },
  description: {
    defaultValue: 'Привет! После запуска задачи на расчет новой модели посмотри, пожалуйста, что-нибудь еще',
    control: {
      type: 'text',
    },
  },
  onCloseClick: {
    defaultValue: null,
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
