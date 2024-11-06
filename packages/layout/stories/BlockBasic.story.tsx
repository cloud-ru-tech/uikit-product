import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BlockBasic, BlockBasicProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack UIkit/Layout/BlockBasic',
  component: BlockBasic,
};

export default meta;

const Template = ({ ...args }: BlockBasicProps) => (
  <div className={styles.blockBasicWrapper}>
    <BlockBasic {...args} className={styles.block}>
      Какое-то содержимое
    </BlockBasic>
  </div>
);

export const blockBasic: StoryObj<BlockBasicProps> = {
  render: Template,
  args: {},
  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-DS%E3%83%BBComponents?type=design&node-id=54759-267939&mode=dev',
    },
  },
};
