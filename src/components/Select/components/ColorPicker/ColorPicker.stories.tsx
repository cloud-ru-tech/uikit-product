import { Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';

import { Select } from 'components/Select';

import { ColorPicker } from './ColorPicker';

export default {
  title: 'Example/Select',
  component: Select,
  decorators: [withDesign],
} as Meta;

export const Template = (): JSX.Element => <ColorPicker />;

Template.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-WHITE_Design_System?node-id=7%3A19911',
  },
};
