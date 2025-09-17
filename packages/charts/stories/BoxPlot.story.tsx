import { Meta, StoryObj } from '@storybook/react';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InteractiveChart, InteractiveChartProps } from '../src';

const meta: Meta = {
  title: 'Console/Charts/Box Plot',
  component: InteractiveChart,
};
export default meta;

function Template({ data, options }: InteractiveChartProps) {
  return <InteractiveChart data={data} options={options} type='boxPlot' />;
}

export const boxPlot: StoryObj<InteractiveChartProps> = {
  render: Template,

  args: {
    data: [
      [1, 2, 3],
      [1, 2, 5], //open
      [2, 5, 5.5], //low
      [2.4, 5.7, 8], //median
      [3, 6, 9.5], //high
      [4, 10, 10], //close
    ],
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=900%3A13657',
    },
    badges: [BADGE.BETA],
  },
};
