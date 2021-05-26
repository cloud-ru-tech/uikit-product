import { Meta, Story } from '@storybook/react/types-6-0';

import { Spin, SpinDefaultProps } from '../src';
import { Sizes } from '../src/helpers/constants';

export default {
  title: 'Components/Spin',
  component: Spin,
} as Meta;

const Template: Story<SpinDefaultProps> = args => <Spin {...args} />;

export const spin = Template.bind({});
spin.args = {
  text: 'Text',
};
spin.argTypes = {
  size: {
    control: {
      type: 'radio',
      options: Object.values(Sizes),
    },
  },
  borderSize: {
    control: {
      type: 'number',
    },
  },
  text: {
    control: {
      type: 'text',
    },
  },
};
