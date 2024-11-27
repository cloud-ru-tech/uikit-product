import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { LoadStatus, LoadStatusProps } from '../src';

const meta: Meta = {
  title: 'Console/Load Status',
  component: LoadStatus,
};

export default meta;

type StoryProps = LoadStatusProps;
function Template(props: StoryProps) {
  return <LoadStatus {...props} />;
}

export const loadStatus: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label',
    value: 'Value',
    valueType: 'percent',
    progress: 70,
    hint: 'Hint text',
    showErrorIcon: true,
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/nrnltwtMewvlg7Oeftg22c/PDS-980-(Load-status)?node-id=22352-131934&t=r9ui39ENLqx5ZpTB-4',
    },
  },
};
