import { Meta } from '@storybook/react/types-6-0';

import { Select } from 'components/Select/components/Default';
import { treeOptions } from 'components/Select/helpers/mockData';

import { TreeView } from '../TreeView';

export default {
  title: 'Components/Select/Treeview',
  component: Select,
} as Meta;

export const Template = (): JSX.Element => <TreeView options={treeOptions} />;

Template.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/9UAhwzTGUnOFaczS5Q5v5c/SberCloud-%E2%86%92-WHITE_Design_System?node-id=7%3A19911',
  },
};
