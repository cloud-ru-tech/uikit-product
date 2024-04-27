import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CopyLine, CopyLineProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack UIkit/Copy Line/Copy Line',
  component: CopyLine,
};
export default meta;

type StoryProps = CopyLineProps & {
  differentValueToCopy: boolean;
};

function Template({ differentValueToCopy, valueToCopy, ...args }: StoryProps) {
  return (
    <div className={styles.wrapper}>
      <CopyLine {...args} valueToCopy={differentValueToCopy ? valueToCopy : undefined} />
    </div>
  );
}

export const copyLine: StoryFn<StoryProps> = Template.bind({});

copyLine.args = {
  content: 'Content truncate 1 line',
  valueToCopy: 'different value to copy',
  differentValueToCopy: false,
};

copyLine.argTypes = {
  valueToCopy: { table: { disable: true } },
  differentValueToCopy: {
    name: '[STORIES]: different value to copy',
    type: 'boolean',
  },
};

copyLine.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=1614%3A89851&mode=design&t=nCXE2W2AqddlTEKF-1',
  },
};
