import { Meta, StoryObj } from '@storybook/react';
import merge from 'lodash.merge';
import { useMemo, useState } from 'react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InteractiveChart, InteractiveChartProps, useLayer } from '../src';
import { DRAW_STYLES, LINE_INTERPOLATIONS } from '../src/components/InteractiveChart/constants';
import { DrawStyle, LineInterpolation } from '../src/components/InteractiveChart/types';
import { SERIES_COLORS, SeriesColor } from '../src/constants/colors';

const meta: Meta = {
  title: 'Snack Uikit/Charts/Base',
  component: InteractiveChart,
};
export default meta;

type StoryProps = InteractiveChartProps & {
  color: SeriesColor;
  drawStyle: DrawStyle;
  lineInterpolation: LineInterpolation;
};

function Template({ color, drawStyle, lineInterpolation, data, options }: StoryProps) {
  const [key, setKey] = useState(0);
  const layer = useLayer({ label: 'layer', color, drawStyle, lineInterpolation });
  const layerOptions = useMemo(() => {
    setKey(x => x + 1);
    return merge(options, { series: [{}, layer] });
  }, [layer, options]);

  return <InteractiveChart key={key} data={data} options={layerOptions} type='default' />;
}

export const base: StoryObj<StoryProps> = {
  render: Template,

  args: {
    data: [
      [1, 2, 3, 4, 5, 6],
      [5, 1, 5, 1, 10, 5],
    ],
    color: SERIES_COLORS.Blue1,
    drawStyle: DRAW_STYLES.Line,
    lineInterpolation: LINE_INTERPOLATIONS.Linear,
  },

  argTypes: {
    color: {
      options: Object.values(SERIES_COLORS),
      control: { type: 'select' },
    },
    drawStyle: {
      options: Object.values(DRAW_STYLES),
      control: { type: 'select' },
    },
    lineInterpolation: {
      options: Object.values(LINE_INTERPOLATIONS),
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
