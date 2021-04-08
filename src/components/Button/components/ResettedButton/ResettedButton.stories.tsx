import { Story, Meta } from '@storybook/react/types-6-0';

import { ResettedButton } from './ResettedButton';

export default {
  title: 'Components/Button',
  component: ResettedButton,
} as Meta;

const Template: Story = () => <ResettedButton>Click me!</ResettedButton>;

export const resettedButton = Template.bind({});
