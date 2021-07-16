import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { InteractiveChart, InteractiveChartProps } from '../src';

export default {
  title: 'Not stable/Interactive Chart/Box Plot',
  component: InteractiveChart,
} as Meta;

const Template: Story<InteractiveChartProps> = ({ data, options }) => (
  <InteractiveChart data={data} options={options} type={InteractiveChart.types.BoxPlot} />
);

export const boxPlot = Template.bind({});
boxPlot.args = {
  data: [
    [1, 2, 3],
    [1, 2, 5], //open
    [2, 5, 5.5], //low
    [2.4, 5.7, 8], //median
    [3, 6, 9.5], //high
    [4, 10, 10], //close
  ],
};
boxPlot.argTypes = {};
boxPlot.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
