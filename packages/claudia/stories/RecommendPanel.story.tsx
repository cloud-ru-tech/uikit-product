import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { RecommendPanel, RecommendPanelProps } from '../src';
import { CHIP_TYPE, SIZE } from '../src/components/RecommendPannel/types';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Claudia/Recommend Panel',
  component: RecommendPanel,
};
export default meta;

const Template: StoryFn<RecommendPanelProps> = ({ ...args }) => (
  <div className={styles.container}>
    <div className={cn(styles.wrapper, styles.recommendPanelWrapperWhiteBg)}>
      <RecommendPanel {...args} />
    </div>
  </div>
);

const chipsData = [
  { id: '1', label: 'Design', onClick: () => alert('Design') },
  { id: '2', label: 'Looooooooooooooooong text', onClick: () => alert('Looooooooooooooooong text') },
  {
    id: '3',
    label: 'Very loooooooooooooooooooooooooooong text',
    onClick: () => alert('Very loooooooooooooooooooooooooooong text'),
  },
  { id: '4', label: 'Marketing', onClick: () => alert('Marketing') },
  { id: '5', label: 'Sales', onClick: () => alert('Sales') },
  { id: '6', label: 'Support', onClick: () => alert('Support') },
  { id: '7', label: 'Analytics', onClick: () => alert('Analytics') },
  { id: '8', label: 'Research', onClick: () => alert('Research') },
  { id: '9', label: 'Mobile', onClick: () => alert('Mobile') },
  { id: '10', label: 'Web', onClick: () => alert('Web') },
];

export const recommendPanel: StoryObj<RecommendPanelProps> = {
  render: Template,
  args: {
    chips: chipsData,
    onCloseClick: () => alert('Closed panel'),
    onCloseChipLabel: 'Close',
    tooltip: 'Original tooltip',
    type: CHIP_TYPE.Default,
    size: SIZE.S,
  },
  argTypes: {
    size: {
      options: [SIZE.S, SIZE.M],
      defaultValue: SIZE.S,
      control: {
        type: 'radio',
      },
    },
    type: {
      options: [CHIP_TYPE.Default, CHIP_TYPE.Outline],
      defaultValue: CHIP_TYPE.Default,
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
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/YHMb4jqMi9r5i7kHrzejep/branch/c4ulPXYbhbxppufRHaUBaq/-CC--Agent-Cloudia--Components?node-id=2738-13004&t=zGWShpUgxiY8Ogv8-0',
    },
  },
};
