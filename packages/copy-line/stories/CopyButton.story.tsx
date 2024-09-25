import { Meta, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CopyButton, CopyButtonProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack UIkit/Copy Line/Copy Button',
  component: CopyButton,
};
export default meta;

function Template({ ...args }: CopyButtonProps) {
  return (
    <div className={styles.wrapper}>
      <CopyButton {...args} />
    </div>
  );
}

export const copyButton: StoryObj<CopyButtonProps> = {
  render: Template,

  args: {
    valueToCopy: 'value to copy',
    size: 's',
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=1614%3A89851&mode=design&t=nCXE2W2AqddlTEKF-1',
    },
  },
};
