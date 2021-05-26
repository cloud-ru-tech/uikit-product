import { Meta, Story } from '@storybook/react/types-6-0';

import { CopyInput, CopyInputProps } from '../src';

export default {
  title: 'Components/Input/Copy Input',
  component: CopyInput,
} as Meta;

const Template: Story<CopyInputProps> = ({ ...args }) => <CopyInput {...args} />;

export const copyInput = Template.bind({});
copyInput.args = {};
copyInput.parameters = {};
copyInput.argTypes = {
  value: {
    defaultValue: 'Пример: Project1-bucket106',
  },
};
