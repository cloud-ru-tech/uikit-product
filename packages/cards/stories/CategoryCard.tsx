import { Meta, Story } from '@storybook/react/types-6-0';

import { BrandCatDisplaySVG } from '@sbercloud/uikit-product-icons';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CategoryCard, CategoryCardProps } from '../src';

export default {
  title: 'Not stable/Card/Category Card',
  component: CategoryCard,
} as Meta;

const handleClick = () => alert('alert');

const Template: Story<CategoryCardProps> = ({ ...args }) => <CategoryCard {...args} onClick={handleClick} />;

export const categoryCard = Template.bind({});
categoryCard.args = {
  title: 'Карточка #1',
  text: 'Картинкой может быть как url, так и иконка из пакета',
  image: <BrandCatDisplaySVG size={48} />,
};
categoryCard.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.BETA],
  design: {
    type: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=632%3A0',
  },
};
