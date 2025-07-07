import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { MobileCarousel, MobileCarouselProps } from '../src';
import { StoryCard } from './helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Mobile/Carousel',
  component: MobileCarousel,
};
export default meta;

type StoryProps = {
  itemsCount?: number;
} & MobileCarouselProps;

const Template: StoryFn<StoryProps> = ({ itemsCount, ...args }: StoryProps) => (
  <div className={styles.wrapper}>
    <MobileCarousel {...args}>
      {Array.from({ length: itemsCount || 12 }).map((_, i) => (
        <StoryCard key={i} title={`Item ${i + 1}`} />
      ))}
    </MobileCarousel>
  </div>
);

export const carousel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    showItems: 1.1,
    scrollBy: 1,
    infiniteScroll: true,
    pagination: true,
    autoSwipe: 5,
    itemsCount: 12,
  },

  argTypes: {
    itemsCount: {
      name: '[Story]: count demo cards',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=44%3A7537&mode=design',
    },
  },
};
