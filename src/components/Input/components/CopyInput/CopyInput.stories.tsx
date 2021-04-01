import { Story, Meta } from '@storybook/react/types-6-0';

import { CopyInput, ICopyInputProps } from './CopyInput';

export default {
  title: 'Components/Input/Copy Input',
  component: CopyInput,
} as Meta;

const Template: Story<ICopyInputProps> = ({ ...args }) => (
  <CopyInput {...args} />
);

export const copyInput = Template.bind({});
copyInput.args = {};
copyInput.parameters = {};
copyInput.argTypes = {
  value: {
    defaultValue: 'Пример: Project1-bucket106',
  },
};
