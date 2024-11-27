import { Meta, StoryObj } from '@storybook/react';

import { SkeletonText } from '@snack-uikit/skeleton';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonDropdown, ButtonDropdownProps } from '../src';
import { DROPLIST_ITEMS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Button Predefined/Button Dropdown',
  component: ButtonDropdown,
};
export default meta;

type StoryProps = ButtonDropdownProps & {
  storyMode: 'droplist' | 'dropdown';
};

function Template({ storyMode, ...args }: StoryProps) {
  if (storyMode === 'droplist') {
    return <ButtonDropdown {...args} items={DROPLIST_ITEMS} />;
  }

  return (
    <ButtonDropdown {...args} content={<SkeletonText width={256} className={styles.skeleton} loading lines={7} />} />
  );
}

export const buttonDropdown: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label text',
    storyMode: 'droplist',
    size: 's',
  },

  argTypes: {
    storyMode: {
      name: '[Stories]: story mode',
      options: ['droplist', 'dropdown'],
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
      url: 'https://www.figma.com/design/SZjPEs7Ac3a2wS0HapamrE/branch/2vraLX7XLBHYmqjAuHKEP6/Product-components?node-id=5089-3321&t=LPAu22mZDyAV9LCh-0',
    },
  },
};
