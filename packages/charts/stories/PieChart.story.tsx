import { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PieChart, PieChartProps } from '../src';

const meta: Meta = {
  title: 'Console/Charts/Pie Chart',
  component: PieChart,
};
export default meta;

type StoryProps = PieChartProps['options'] & {
  aggregatedLegendTitle: string;
};

const handleClick = ({ label }: { label: string | number }) => alert(`${label} clicked!`);

function Template({ aggregatedLegendTitle, width, height, ...args }: StoryProps) {
  const data = useMemo(
    () => [
      { id: 'true_positives', label: 'True Positives With Some Extremely Long Title', value: 10 },
      { id: 'true_negatives', label: 'True Negatives', value: 15 },
      { id: 'false_positives', label: 'False Positives', value: 45 },
      { id: 'false_negatives', label: 'False Negatives', value: 30 },
      { id: 'neg', label: 'Neg', value: 30 },
    ],
    [],
  );

  const aggregatedLegend = useMemo(
    () => ({
      title: aggregatedLegendTitle,
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
      onAggregatedLegendItemClick: handleClick,
    }),
    [aggregatedLegendTitle],
  );

  return (
    <PieChart
      data={data}
      onPieSegmentClick={handleClick}
      onLegendItemClick={handleClick}
      aggregatedLegend={aggregatedLegend}
      options={{
        ...args,
        width,
        height,
      }}
    />
  );
}

export const pieChart: StoryObj<StoryProps> = {
  render: Template,

  args: {
    width: 800,
    height: 400,
    typographySize: 'l',
    title: 'Pie Chart',
    legendTitle: 'Legend Title',
    aggregatedLegendTitle: 'Распределение',
  },

  argTypes: {
    width: {
      name: 'options.width',
      type: 'number',
    },
    height: {
      name: 'options.height',
      type: 'number',
    },
    title: {
      name: 'options.title',
    },
    legendTitle: {
      name: 'options.legendTitle',
    },
    typographySize: {
      name: 'options.typographySize',
      options: ['s', 'm', 'l'],
      control: {
        type: 'radio',
      },
    },
    aggregatedLegendTitle: {
      name: 'options.aggregatedLegend.title',
    },
  },

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
