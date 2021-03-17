import { Story, Meta } from '@storybook/react/types-6-0';

import { Textarea, ITextareaProps } from './Textarea';

export default {
  title: 'Components/Input',
  component: Textarea,
} as Meta;

const Template: Story<ITextareaProps> = ({ ...args }) => <Textarea {...args} />;

export const textarea = Template.bind({});
textarea.args = {};
textarea.parameters = {};
