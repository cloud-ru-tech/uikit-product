import { Meta, StoryObj } from '@storybook/react';

import { QuestionTooltip } from '@snack-uikit/tooltip';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BagelChart, BagelChartProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Charts/BagelChart',
  component: BagelChart,
};
export default meta;

function Template({ ...args }: BagelChartProps) {
  return (
    <div className={styles.wrapper}>
      <BagelChart {...args} />
    </div>
  );
}

export const bagelChart: StoryObj<BagelChartProps> = {
  render: Template,

  args: {
    total: 100000,
    value: 75001,
    title: (
      <div className={styles.title}>
        <div>{'Title'}</div>

        <QuestionTooltip tip='content' size='s' />
      </div>
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
