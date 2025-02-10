import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { CardInfoProps } from '@sbercloud/uikit-product-site-cards';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionBenefits, SectionBenefitsProps } from '../src';

const meta: Meta = {
  title: 'Site/Section/Benefits',
  component: SectionBenefits,
};

export default meta;

const TABS = Array.from({ length: 3 }, (_, i) => ({
  value: i.toString(),
  label: `Title ${i + 1}`,
}));

const CARD_BASIC_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  title: `Title ${i + 1}`,
  description: `description ${i + 1}`,
  icon: PlaceholderSVG,
}));

const CONTENT_BASIC = Array.from({ length: 3 }, (_, i) => ({
  tabValue: i.toString(),
  cardBasicItems: CARD_BASIC_ITEMS,
}));

const CARD_INFO_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  title: `Title ${i + 1}`,
  description: `description ${i + 1}`,
  icon: PlaceholderSVG,
  href: '#',
  tag: {
    type: 'free',
    variant: 'promo',
  } as CardInfoProps['tag'],
}));

const CONTENT_INFO = Array.from({ length: 3 }, (_, i) => ({
  tabValue: i.toString(),
  cardInfoItems: CARD_INFO_ITEMS,
}));

type StoryProps = SectionBenefitsProps & {
  withTabs: boolean;
};

const Template: StoryFn<StoryProps> = ({
  layoutType,
  type = 'basic',
  title,
  titleTag,
  description,
  columnsConfig,
  withTabs,
}) => {
  const contentBasicWithTabs = {
    tabBarItems: TABS,
    content: CONTENT_BASIC,
  };
  const contentBasicWithoutTabs = {
    content: CARD_BASIC_ITEMS,
  };

  const contentInfoWithTabs = {
    tabBarItems: TABS,
    content: CONTENT_INFO,
  };
  const contentInfoWithoutTabs = {
    content: CARD_INFO_ITEMS,
  };

  const contentBasic = withTabs ? contentBasicWithTabs : contentBasicWithoutTabs;
  const contentInfo = withTabs ? contentInfoWithTabs : contentInfoWithoutTabs;

  if (type === 'basic') {
    return (
      <SectionBenefits
        title={title}
        titleTag={titleTag}
        description={description}
        type={type}
        layoutType={layoutType}
        columnsConfig={columnsConfig}
        {...contentBasic}
      />
    );
  }

  return (
    <SectionBenefits
      title={title}
      titleTag={titleTag}
      description={description}
      type={type}
      layoutType={layoutType}
      columnsConfig={columnsConfig}
      {...contentInfo}
    />
  );
};

export const benefits: StoryObj<StoryProps> = {
  render: Template,
  args: {
    title: 'Section Title',
    description: 'description',
    type: 'basic',
    layoutType: 'desktop',
    columnsConfig: {
      desktop: { amount: 4, minWidth: 298 },
      desktopSmall: { amount: 3, minWidth: 298 },
      tablet: { amount: 2, minWidth: 348 },
      mobile: { amount: 1, minWidth: 328 },
    },
    withTabs: true,
  },
  argTypes: {
    withTabs: {
      name: '[Story]: With tabs',
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
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=7235-326832&t=153GObcrGkYiqEwO-0',
    },
  },
};
