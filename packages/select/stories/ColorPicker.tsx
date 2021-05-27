import { Meta } from '@storybook/react/types-6-0';

import { ColorPicker } from '../src';

export default {
  title: 'Components/Select',
  component: ColorPicker,
} as Meta;

const Template = (): JSX.Element => <ColorPicker />;

export const colorPicker = Template.bind({});
