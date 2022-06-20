import { Meta, Story } from '@storybook/react/types-6-0';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HeatMapChart, HeatMapChartProps } from '../src';
import { XAxisPosition } from '../src/components/HeatMapChart/constants';

export default {
  title: 'Not stable/Charts/Heat Map Chart',
  component: HeatMapChart,
} as Meta;

type StoryProps = HeatMapChartProps & {
  xAxisPosition: XAxisPosition;
  showLegend: boolean;
  height?: number;
};

const Template: Story<StoryProps> = ({ xAxisPosition, showLegend, height, ...args }) => {
  const props = {
    ...args,
    options: {
      ...args.options,
      height,
      legend: {
        ...args.options.legend,
        show: showLegend,
      },
      axes: {
        ...args.options.axes,
        xAxis: {
          ...args.options.axes?.xAxis,
          position: xAxisPosition,
        },
      },
    },
  };

  return <HeatMapChart {...props} />;
};

const data = [
  [0.8793309438470729, 0.1003584229390681, 0, 0.015531660692951015, 0.0023894862604540022, 0.0023894862604540022],
  [
    0.11860174781523096, 0.8401997503121099, 0.006242197253433208, 0.02372034956304619, 0.008739076154806492,
    0.0024968789013732834,
  ],
  [
    0.0025188916876574307, 0.0012594458438287153, 0.9370277078085643, 0.0025188916876574307, 0.0025188916876574307,
    0.05415617128463476,
  ],
  [
    0.018469656992084433, 0.010554089709762533, 0.002638522427440633, 0.9617414248021108, 0.002638522427440633,
    0.00395778364116095,
  ],
  [0.009247027741083224, 0.005284015852047556, 0, 0, 0.9854689564068693, 0],
  [0, 0, 0.07113543091655267, 0, 0.0027359781121751026, 0.9261285909712722],
];
const labels = Array.from({ length: data.length }, (_, i) => String(i));
export const heatMapChart = Template.bind({});
heatMapChart.args = {
  data,
  options: {
    title: 'Confusion Matrix',
    domain: [0, 1],
    axes: {
      xAxis: {
        label: 'y_pred',
        ticks: labels,
      },
      yAxis: {
        label: 'y_true',
        ticks: labels,
      },
    },
    formatter: (val: number) => val.toPrecision(2),
  },
};
heatMapChart.argTypes = {
  xAxisPosition: {
    defaultValue: XAxisPosition.Bottom,
    name: '[Stories]: xAxis position',
    control: {
      type: 'radio',
      options: [XAxisPosition.Bottom, XAxisPosition.Top],
    },
  },
  showLegend: {
    defaultValue: true,
    name: '[Stories]: show or hide legend',
    control: {
      type: 'boolean',
    },
  },
  height: {
    defaultValue: 700,
    name: '[Stories]: Height',
    control: {
      type: 'number',
    },
  },
};
heatMapChart.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=900%3A13657',
  },
  badges: [BADGE.BETA],
};
