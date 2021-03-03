import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { Divider } from './Divider';

export default {
  title: 'Components/Divider',
  component: Divider,
  decorators: [withDesign],
} as Meta;

const Template: Story<any> = ({ ...args }) => <Divider {...args} />;

export const divider = Template.bind({});
divider.args = {
  color: 'dark',
};

divider.argTypes = {
  color: {
    control: {
      type: 'color',
    },
  },
};
