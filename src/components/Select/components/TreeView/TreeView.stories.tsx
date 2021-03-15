import { Meta } from '@storybook/react/types-6-0';

import { treeOptions } from 'components/Select/helpers/mockData';

import { TreeView } from './TreeView';

export default {
  title: 'Components/Select',
  component: TreeView,
} as Meta;

const Template = (): JSX.Element => <TreeView options={treeOptions} />;

export const treeView = Template.bind({});
