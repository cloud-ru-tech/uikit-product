import { Meta, Story } from '@storybook/react/types-6-0';

import { ITextareaProps, Textarea } from '../src';

export default {
  title: 'Components/Input',
  component: Textarea,
} as Meta;

const Template: Story<ITextareaProps> = ({ ...args }) => <Textarea {...args} />;

export const textarea = Template.bind({});
textarea.args = {};
textarea.parameters = {};
