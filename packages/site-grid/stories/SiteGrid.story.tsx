import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { CardSuggest } from '@cloud-ru/uikit-product-card-predefined';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Grid, GridProps } from '../src';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Grid',
  component: Grid,
};
export default meta;

type StoryProps = GridProps;

const sampleCards = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const sampleConfig: GridProps['columnsConfig'] = {
  desktop: { amount: 4, minWidth: 300 },
  tablet: { amount: 2, minWidth: 300 },
  mobile: { amount: 3, minWidth: 250 },
};

const Template: StoryFn<StoryProps> = ({ layoutType, gap }) => (
  <div className={styles.wrapper}>
    <Grid columnsConfig={sampleConfig} gap={gap} layoutType={layoutType}>
      {sampleCards.map(card => (
        <CardSuggest key={card} title={`Card ${card} title`} description={`Card ${card} description`} />
      ))}
    </Grid>
  </div>
);

export const grid: StoryObj<StoryProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    gap: 'm',
  },
  argTypes: {
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
      control: {
        type: 'radio',
      },
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
  },
};
