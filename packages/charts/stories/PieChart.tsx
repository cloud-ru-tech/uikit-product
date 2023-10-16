import { Meta, StoryFn } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PieChart, PieChartProps } from '../src';

const meta: Meta = {
  title: 'Not stable/Charts/Pie Chart',
  component: PieChart,
};
export default meta;

function Template({ ...args }: PieChartProps) {
  return <PieChart {...args} />;
}

export const pieChart: StoryFn<PieChartProps> = Template.bind({});
pieChart.args = {
  options: {
    width: 800,
    height: 400,
    title: 'Pie Chart',
    legendTitle: 'Legend Title',
  },
  aggregatedLegend: {
    title: 'Распределение',
    data: [
      {
        label: 'Precision',
        value: '79,17 %',
      },
      {
        label: 'Recall',
        value: '69,09 %',
      },
      {
        label: 'F1-Score',
        value: '73 %',
      },
    ],
  },
  data: [
    { label: 'True Positives', value: 10 },
    { label: 'True Negatives', value: 15 },
    { label: 'False Positives', value: 45 },
    { label: 'False Negatives', value: 30 },
    { label: 'Neg', value: 30 },
  ],
};
pieChart.argTypes = {};
pieChart.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=900%3A13657',
  },
  badges: [BADGE.BETA],
};
