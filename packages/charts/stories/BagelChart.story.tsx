import { styled } from '@linaria/react';
import { Meta, StoryObj } from '@storybook/react';

import { InfoOutlineInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@snack-uikit/tooltip';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BagelChart, BagelChartProps } from '../src/components/BagelChart';

const meta: Meta = {
  title: 'Not stable/Charts/BagelChart',
  component: BagelChart,
};
export default meta;

const Wrapper = styled.div`
  width: 100px;
  overflow: auto;
  resize: horizontal;
`;
function Template({ ...args }: BagelChartProps) {
  return (
    <Wrapper>
      <BagelChart {...args} />
    </Wrapper>
  );
}

export const bagelChart: StoryObj<BagelChartProps> = {
  render: Template,

  args: {
    total: 100000,
    value: 75001,
    title: (
      <>
        <div>{'Title'}</div>
        <Tooltip tip='content'>
          <InfoOutlineInterfaceSVG />
        </Tooltip>
      </>
    ),
  },

  argTypes: {
    value: {
      name: 'value',
      control: {
        type: 'range',
        min: 0,
        max: 100000,
        step: 100,
      },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?node-id=900%3A13657',
    },
    badges: [BADGE.BETA],
  },
};
