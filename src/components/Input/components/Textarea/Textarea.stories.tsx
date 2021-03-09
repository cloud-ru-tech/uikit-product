import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';

import { Input } from 'components/Input';

import { Textarea } from './Textarea';

export default {
  title: 'Example/Input',
  component: Input,
  decorators: [withDesign],
} as Meta;

const Template: Story = () => <Textarea />;

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {};
