import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BlogCarouselItem, SectionBlogCarousel, SectionBlogCarouselProps } from '../src';
import { SECTION_COLORS } from '../src/constants';
import blogCarouselItemBg from './assets/blogCarouselItemBg.png';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Blog Carousel',
  component: SectionBlogCarousel,
};

export default meta;

type StoryProps = SectionBlogCarouselProps & {
  cardsAmount: number;
};

const createSampleCard = (index: number): BlogCarouselItem => ({
  title: `Title ${index}`,
  titleTag: 'h2',
  tag: {
    label: 'Сервисы',
    appearance: 'neutral',
  },
  img: blogCarouselItemBg,
  time: '12',
  date: '23 августа 2025',
  href: '#',
  onClick(e?: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) {
    e?.preventDefault();
    alert('clicked!');
  },
});

const generateCards = (amount: number): BlogCarouselItem[] => {
  const items: BlogCarouselItem[] = [];

  for (let i = 0; i < amount; i++) {
    items.push(createSampleCard(i + 1));
  }

  return items;
};

const Template: StoryFn<StoryProps> = ({ cardsAmount, ...args }) => {
  const sampleItems = useMemo(() => generateCards(cardsAmount), [cardsAmount]);

  return (
    <div className={styles.resizeWrapper}>
      <SectionBlogCarousel {...args} items={sampleItems} />
    </div>
  );
};

export const blogCarousel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-blog',
    title: 'Section title',
    description: 'Description',
    cardsAmount: 9,
    backgroundColor: SECTION_COLORS.NeutralBackground1Level,
    layoutType: 'desktop',
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
    cardsAmount: {
      name: '[Story]: Amount of sample cards',
    },
    layoutType: {
      name: '[Story]: Layout type',
      options: Object.values(LAYOUT_TYPE),
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=7517-111482&t=60soTP2F1hK1xgpC-0',
    },
  },
};
