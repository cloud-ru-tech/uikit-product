import { Story, Meta } from '@storybook/react/types-6-0';

import { SIZES } from 'components/Spin/helpers/constants';

import { Spin, ISpinDefaultProps } from './Spin';

export default {
  title: 'Components/Spin',
  component: Spin,
} as Meta;

const Template: Story<ISpinDefaultProps> = args => <Spin {...args} />;

export const spin = Template.bind({});
spin.args = {
  text: 'Text',
};
spin.argTypes = {
  size: {
    control: {
      type: 'radio',
      options: Object.values(SIZES),
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
