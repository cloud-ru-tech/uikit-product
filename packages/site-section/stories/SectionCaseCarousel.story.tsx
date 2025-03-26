import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CaseItem, SectionCaseCarousel, SectionCaseCarouselProps } from '../src';
import { SECTION_COLORS } from '../src/constants';
import samplePartnerImage from './assets/partner-logo.svg';
import { LAYOUT_TYPE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Site/Section/Case Carousel',
  component: SectionCaseCarousel,
};

export default meta;

type StoryProps = SectionCaseCarouselProps & {
  partnersAmount: number;
  showMoreButton?: boolean;
};

const createSamplePartner = (index: number): CaseItem => ({
  logo: {
    src: samplePartnerImage as unknown as string,
    alt: 'dodo',
  },
  description:
    index === 0
      ? 'Handgloves Description Sample'
      : '<p>Handgloves Description Sample Description Sample Description Handgloves Sample Description Sample Handgloves Description Handgloves Description Sample Description Sample Description Handgloves Sample Description Sample Handgloves Description</p>',
});

const generatePartners = (amount: number): CaseItem[] => {
  const partners: CaseItem[] = [];

  for (let i = 0; i < amount; i++) {
    partners.push(createSamplePartner(i));
  }

  return partners;
};

const Template: StoryFn<StoryProps> = ({ id, title, partnersAmount, layoutType, backgroundColor, showMoreButton }) => {
  const sampleCases = useMemo(() => generatePartners(partnersAmount), [partnersAmount]);

  return (
    <div className={styles.resizeWrapper}>
      <SectionCaseCarousel
        id={id}
        title={title}
        items={sampleCases}
        layoutType={layoutType}
        backgroundColor={backgroundColor}
        moreButton={
          showMoreButton
            ? {
                onClick() {},
              }
            : undefined
        }
      />
    </div>
  );
};

export const caseCarousel: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-case-carousel',
    title: 'Наши партнеры',
    partnersAmount: 5,
    backgroundColor: SECTION_COLORS.NeutralBackground,
    layoutType: 'desktop',
  },
  argTypes: {
    backgroundColor: { control: { type: 'select' } },
    partnersAmount: {
      name: '[Story]: Amount of sample partners',
    },
    showMoreButton: {
      name: '[Story]: Show more button in section footer',
      control: { type: 'boolean' },
    },
    moreButton: {
      table: {
        disable: true,
      },
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=7612-614136&t=d6HroXimun0WBR5b-0',
    },
  },
};
