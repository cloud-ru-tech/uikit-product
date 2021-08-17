import { BADGE } from '@geometricpanda/storybook-addon-badges';
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
    url: 'https://www.figma.com/file/VVqNc0dufYULpLuwIBB84U/%F0%9F%94%A5%5BLIB%5D-Design-System-2.0--%3E-Atoms?node-id=900%3A13657',
  },
  badges: [BADGE.BETA],
};
