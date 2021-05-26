import { Meta, Story } from '@storybook/react/types-6-0';

import { CopyButton, CopyButtonProps } from '../src';

export default {
  title: 'Components/Button/Copy Button',
  component: CopyButton,
} as Meta;

const Template: Story<CopyButtonProps> = ({ ...args }) => <CopyButton {...args} />;

export const copyButton = Template.bind({});
copyButton.args = {
  text: 'Copy text',
};
