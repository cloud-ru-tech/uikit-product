import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { CardServiceSmall } from '@sbercloud/uikit-product-card-predefined';
import { useAdaptive } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ProductsWidget, ProductsWidgetProps } from '../src';

const meta: Meta = {
  title: 'Console/Widget/Products Widget',
  component: ProductsWidget,
};
export default meta;

const CARDS = Array.from({ length: 24 }).fill(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <CardServiceSmall title={'Title'} description={'Description'} />,
) as ReactNode[];

type StoryProps = ProductsWidgetProps;

function Template({ ...args }: StoryProps) {
  const { layoutType } = useAdaptive();
  return <ProductsWidget {...args} layoutType={layoutType} />;
}

export const productsWidget: StoryObj<StoryProps> = {
  render: Template,

  args: {
    columnSize: 3,
    rowSize: 4,
    cards: CARDS,
    loading: false,
    arrows: true,
    pagination: true,
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
      url: 'https://www.figma.com/file/SZjPEs7Ac3a2wS0HapamrE/Product-components?type=design&node-id=578%3A15410&mode=design&t=rMYCa7WGV6xrL5wY-1',
    },
  },
};
