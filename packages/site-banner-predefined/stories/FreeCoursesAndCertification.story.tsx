import { Meta, StoryFn, StoryObj } from '@storybook/react';

import {
  FreeCoursesAndCertification,
  FreeCoursesAndCertificationProps,
} from '@cloud-ru/uikit-product-site-banner-predefined';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Banner Predefined/FreeCoursesAndCertification',
  component: FreeCoursesAndCertification,
};
export default meta;

type StoryProps = FreeCoursesAndCertificationProps;

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div className={styles.wrapper}>
    <FreeCoursesAndCertification {...args} />
  </div>
);

export const freeCoursesAndCertification: StoryObj<StoryProps> = {
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
      url: 'https://www.figma.com/design/0oY0swVilRXB9HhJZp5Exo/branch/Lh6nA41D2L7M5P5qrW42Hq/Banners-Lib-2025?node-id=2203-7541',
    },
  },
};
