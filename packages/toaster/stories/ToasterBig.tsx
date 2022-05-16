import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-product-button';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToasterBigProps, useToast } from '../src';
import { ToasterBig } from '../src/components/ToasterBig';

export default {
  title: 'Components/Toaster/Toaster Big',
  component: ToasterBig,
} as Meta;

const Block = styled.div`
  margin-bottom: 8px;
`;

const actions: ToasterBigProps['actions'] = [
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

const Template: Story<ToasterBigProps> = ({ ...args }) => {
  const { openToast, types } = useToast();

  const toast = (actions?: ToasterBigProps['actions']) => {
    openToast({
      type: types.Big,
      toastProps: { ...args, actions },
    });
  };

  return (
    <>
      <Block>
        <Button data-test-id='trigger-toaster' onClick={() => toast()} text={`Open ${args.status} toaster`} />
      </Block>
      <Block>
        <Button
          data-test-id='trigger-toaster-one-action'
          onClick={() => toast([actions[0]])}
          text={`Open ${args.status} toaster with one action`}
        />
      </Block>
      <Block>
        <Button
          data-test-id='trigger-toaster-two-actions'
          onClick={() => toast(actions)}
          text={`Open ${args.status} toaster with multiple actions`}
        />
      </Block>
    </>
  );
};

export const toasterBig = Template.bind({});
toasterBig.args = {};
toasterBig.argTypes = {
  status: {
    defaultValue: useToast.statuses.Big.Info,
    options: Object.values(useToast.statuses.Big),
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
toasterBig.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Platform-Design-System?node-id=8412%3A105710',
  },
  badges: [BADGE.STABLE],
};
