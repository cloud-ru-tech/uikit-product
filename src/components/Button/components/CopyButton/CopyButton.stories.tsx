import { Story, Meta } from '@storybook/react/types-6-0';

import { ICopyButtonProps, CopyButton } from 'components';

export default {
  title: 'Components/Button/Copy Button',
  component: CopyButton,
} as Meta;

const Template: Story<ICopyButtonProps> = ({ ...args }) => (
  <CopyButton {...args} />
);

export const copyButton = Template.bind({});
copyButton.args = {
  text: 'Copy text',
};
