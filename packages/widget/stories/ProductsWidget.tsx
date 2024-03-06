import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ProductsWidget, ProductsWidgetProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Snack Uikit/Widget/Products Widget',
  component: ProductsWidget,
};
export default meta;

const PRODUCTS = Array.from({ length: 24 }).fill({
  title: 'Title',
  description: 'Description',
}) as ProductsWidgetProps['products'];

type StoryProps = ProductsWidgetProps;

function Template({ ...args }: StoryProps) {
  return (
    <div className={styles.wrapperResize}>
      <ProductsWidget {...args} />
    </div>
  );
}

export const productsWidget: StoryFn<StoryProps> = Template.bind({});

productsWidget.args = {
  columnSize: 3,
  rowSize: 4,
  products: PRODUCTS,
  loading: false,
};

productsWidget.argTypes = {};

productsWidget.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=578%3A15410&mode=design&t=rMYCa7WGV6xrL5wY-1',
  },
};
