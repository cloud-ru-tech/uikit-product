import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { CardMarketplaceProps } from '@sbercloud/uikit-product-site-cards';
import { SectionMarketplaceCarousel, SectionMarketplaceCarouselProps } from '@sbercloud/uikit-product-site-section';
import { LayoutType } from '@sbercloud/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SECTION_COLORS } from '../src/constants';
import checker from './assets/checker.png';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Marketplace Carousel',
  component: SectionMarketplaceCarousel,
};

export default meta;

type StoryProps = SectionMarketplaceCarouselProps & {
  cardsAmount: number;
};

const createSampleCard = (index: number, layoutType: LayoutType): CardMarketplaceProps => ({
  title: `Title ${index}`,
  description: `Description ${index}`,
  href: 'https://cloud.ru',
  logo: {
    src: checker,
    alt: `sample-image-${index}`,
  },
  layoutType,
  tag: {
    text: 'free',
    appearance: 'blue',
  },
});

const generateSampleCards = (amount: number, layoutType: LayoutType): CardMarketplaceProps[] => {
  const cards: CardMarketplaceProps[] = [];

  for (let i = 0; i < amount; i++) {
    cards.push(createSampleCard(i + 1, layoutType));
  }

  return cards;
};

const Template: StoryFn<StoryProps> = ({ cardsAmount, ...args }) => {
  const sampleItems = useMemo(() => generateSampleCards(cardsAmount, args.layoutType), [args.layoutType, cardsAmount]);

  return (
    <div className={styles.resizeWrapper}>
      <SectionMarketplaceCarousel {...args} items={sampleItems} />
    </div>
  );
};

export const marketplaceCarousel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-marketplace',
    title: 'Section Title',
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=7549-101699&t=d6HroXimun0WBR5b-0',
    },
  },
};
