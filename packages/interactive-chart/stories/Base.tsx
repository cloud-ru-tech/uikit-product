import { Meta, Story } from '@storybook/react/types-6-0';
import merge from 'lodash.merge';
import { useMemo, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InteractiveChart, InteractiveChartProps, createLayer } from '../src';
import { Colors } from '../src/constants/colors';
import { DrawStyles, LineInterpolations } from '../src/constants/layerStyles';

export default {
  title: 'Not stable/Interactive Chart/Base',
  component: InteractiveChart,
} as Meta;

const Template: Story<
  InteractiveChartProps & { color: Colors; drawStyle: DrawStyles; lineInterpolation: LineInterpolations }
> = ({ color, drawStyle, lineInterpolation, data, options }) => {
  const [key, setKey] = useState(0);
  const layerOptions = useMemo(() => {
    setKey(x => x + 1);
    return merge(options, { series: [{}, createLayer('layer', color, drawStyle, lineInterpolation)] });
  }, [color, drawStyle, lineInterpolation, options]);
  return <InteractiveChart key={key} data={data} options={layerOptions} type={InteractiveChart.types.Default} />;
};

export const base = Template.bind({});
base.args = {
  data: [
    [1, 2, 3, 4, 5, 6],
    [5, 1, 5, 1, 10, 5],
  ],
};
base.argTypes = {
  color: {
    defaultValue: Colors.Blue1,
    control: { type: 'select', options: Object.values(Colors) },
  },
  drawStyle: {
    defaultValue: DrawStyles.Line,
    control: { type: 'select', options: Object.values(DrawStyles) },
  },
  lineInterpolation: {
    defaultValue: LineInterpolations.Linear,
    control: { type: 'select', options: Object.values(LineInterpolations) },
  },
};
base.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
