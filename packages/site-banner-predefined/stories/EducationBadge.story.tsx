import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { EducationBadge, EducationBadgeProps } from '../src/components/EducationBadge';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Banner Predefined/EducationBadge',
  component: EducationBadge,
};
export default meta;

type StoryProps = EducationBadgeProps;

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div className={styles.wrapper}>
    <EducationBadge {...args} />
  </div>
);

export const educationBadge: StoryObj<StoryProps> = {
  render: Template,
  args: {
    href: '',
    onClick: () => alert('Hello'),
    layoutType: 'desktop',
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
      url: 'https://www.figma.com/design/v7hGnPN8wq2tx1uL8idrgg/Badge-banner?node-id=2397-3320&t=gVm4t3Cq34bTHqKu-4',
    },
  },
};
