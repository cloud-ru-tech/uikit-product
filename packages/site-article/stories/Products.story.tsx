import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Products, ProductsProps } from '../src';
import defaultIcon from './assets/square.webp';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Article/Products',
  component: Products,
};
export default meta;

const Template: StoryFn<ProductsProps> = ({ ...args }) => (
  <div className={styles.whiteWrapper}>
    <Products {...args} />
  </div>
);

export const products: StoryObj<ProductsProps> = {
  render: Template,
  args: {
    layoutType: 'desktop',
    products: [
      { name: 'Evolution Compute', href: '#', icon: defaultIcon },
      { name: 'Evolution Bare Metal', href: '#', icon: defaultIcon },
      { name: 'Evolution Managed PostgreSQL', href: '#', icon: defaultIcon },
      { name: 'Evolution Disk', href: '#', icon: defaultIcon },
      { name: 'Evolution Managed Metastore', href: '#', icon: defaultIcon },
    ],
    solutions: [{ name: '3D-моделирование и рендеринг', href: '#', icon: defaultIcon }],
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/-LIB--SITE--Product-UI-Kit?node-id=17239-4445&t=NR1mOGmYhZpy2gru-0',
    },
  },
};
