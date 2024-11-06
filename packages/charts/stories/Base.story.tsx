import { Meta, StoryObj } from '@storybook/react';
import merge from 'lodash.merge';
import { useMemo, useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { createLayer, InteractiveChart, InteractiveChartProps } from '../src';
import { DrawStyles, LineInterpolations } from '../src/components/InteractiveChart/constants';
import { Colors } from '../src/constants/colors';

const meta: Meta = {
  title: 'Snack Uikit/Charts/Base',
  component: InteractiveChart,
};
export default meta;

type StoryProps = InteractiveChartProps & {
  color: Colors;
  drawStyle: DrawStyles;
  lineInterpolation: LineInterpolations;
};

function Template({ color, drawStyle, lineInterpolation, data, options }: StoryProps) {
  const [key, setKey] = useState(0);
  const layerOptions = useMemo(() => {
    setKey(x => x + 1);
    return merge(options, { series: [{}, createLayer('layer', color, drawStyle, lineInterpolation)] });
  }, [color, drawStyle, lineInterpolation, options]);
  return <InteractiveChart key={key} data={data} options={layerOptions} type={InteractiveChart.types.Default} />;
}

export const base: StoryObj<StoryProps> = {
  render: Template,

  args: {
    data: [
      [1, 2, 3, 4, 5, 6],
      [5, 1, 5, 1, 10, 5],
    ],
    color: Colors.Blue1,
    drawStyle: DrawStyles.Line,
    lineInterpolation: LineInterpolations.Linear,
  },

  argTypes: {
    color: {
      options: Object.values(Colors),
      control: { type: 'select' },
    },
    drawStyle: {
      options: Object.values(DrawStyles),
      control: { type: 'select' },
    },
    lineInterpolation: {
      options: Object.values(LineInterpolations),
      control: { type: 'select' },
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
