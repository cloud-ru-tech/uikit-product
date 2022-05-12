import { Meta, Story } from '@storybook/react/types-6-0';

import { Button } from '@sbercloud/uikit-react-button';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToasterSmallProps, useToast } from '../src';
import { ToasterSmall } from '../src/components/ToasterSmall';

export default {
  title: 'Components/Toaster/Toaster Small',
  component: ToasterSmall,
} as Meta;

const Template: Story<ToasterSmallProps> = ({ ...args }) => {
  const { openToast, types } = useToast();

  const onClick = () =>
    openToast({
      type: types.Small,
      toastProps: args,
    });

  return (
    <>
      <Button data-test-id='trigger-toaster' onClick={onClick} text={`Open ${args.status} toaster`} />
    </>
  );
};

export const toasterSmall = Template.bind({});
toasterSmall.args = {};
toasterSmall.argTypes = {
  status: {
    defaultValue: useToast.statuses.Small.Success,
    options: Object.values(useToast.statuses.Small),
    control: {
      type: 'radio',
    },
  },
  text: {
    defaultValue: 'Перенос данных завершен',
    control: {
      type: 'text',
    },
  },
};
toasterSmall.parameters = {
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
