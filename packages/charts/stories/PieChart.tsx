import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PieChart, PieChartProps } from '../src';

export default {
  title: 'Not stable/Charts/Pie Chart',
  component: PieChart,
} as Meta;

const Template: Story<PieChartProps> = ({ ...args }) => <PieChart {...args} />;

export const pieChart = Template.bind({});
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
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=900%3A13657',
  },
  badges: [BADGE.BETA],
};
