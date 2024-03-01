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

function Template({ ...args }: CopyLineProps) {
  return (
    <div className={styles.wrapper}>
      <CopyLine {...args} />
    </div>
  );
}

export const copyLine: StoryFn<CopyLineProps> = Template.bind({});

copyLine.args = {
  content: 'Content truncate 1 line',
  valueToCopy: 'value to copy',
};

copyLine.argTypes = {};

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
