import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import { PlaceholderSVG } from '@sbercloud/uikit-product-icons';
import { CardInfoProps, CardProductProps } from '@sbercloud/uikit-product-site-cards';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SectionBenefits, SectionBenefitsProps } from '../src';

const meta: Meta = { title: 'Site/Section/Benefits', component: SectionBenefits };

export default meta;

const TABS = Array.from({ length: 3 }, (_, i) => ({ value: i.toString(), label: `Title ${i + 1}` }));

const CARD_BASIC_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  title: `Title ${i + 1}`,
  description: `description ${i + 1}`,
  icon: PlaceholderSVG,
}));

const CONTENT_BASIC = Array.from({ length: 3 }, (_, i) => ({ tabValue: i.toString(), cards: CARD_BASIC_ITEMS }));

const CARD_INFO_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  title: `Title ${i + 1}`,
  description: `description ${i + 1}`,
  icon: PlaceholderSVG,
  href: '#',
  tag: { text: 'free', appearance: 'blue' } as CardInfoProps['tag'],
}));

const CARD_PRODUCT_ITEMS = Array.from({ length: 8 }, (_, i) => ({
  title: `Title ${i + 1}`,
  description: `description ${i + 1}`,
  icon: PlaceholderSVG,
  href: '#',
  tags: [
    { text: 'Разработка', appearance: 'neutral' },
    { text: 'Git', appearance: 'neutral' },
  ] as CardProductProps['tags'],
  showBadge: true,
  showIcon: false,
}));

const CONTENT_INFO = Array.from({ length: 3 }, (_, i) => ({ tabValue: i.toString(), cards: CARD_INFO_ITEMS }));
const CONTENT_PRODUCT = Array.from({ length: 3 }, (_, i) => ({ tabValue: i.toString(), cards: CARD_PRODUCT_ITEMS }));

type StoryProps = SectionBenefitsProps & { withTabs: boolean; buttonsExample?: 'buttons' | 'links' };

const Template: StoryFn<StoryProps> = ({
  id,
  layoutType,
  type = 'basic',
  title,
  titleTag,
  subtitle,
  subtitleTag,
  description,
  columnsConfig,
  withTabs,
  buttonsExample,
  backgroundColor,
  buttonsAlign = 'left',
  note,
  ...rest
}) => {
  const contentBasicWithTabs = { tabBarItems: TABS, content: CONTENT_BASIC };
  const contentBasicWithoutTabs = { content: CARD_BASIC_ITEMS };

  const contentInfoWithTabs = { tabBarItems: TABS, content: CONTENT_INFO };
  const contentInfoWithoutTabs = { content: CARD_INFO_ITEMS };

  const contentProductWithTabs = { tabBarItems: TABS, content: CONTENT_PRODUCT };
  const contentProductWithoutTabs = { content: CARD_PRODUCT_ITEMS };

  const contentBasic = withTabs ? contentBasicWithTabs : contentBasicWithoutTabs;
  const contentInfo = withTabs ? contentInfoWithTabs : contentInfoWithoutTabs;
  const contentProduct = withTabs ? contentProductWithTabs : contentProductWithoutTabs;

  const propsForTypeInfo = rest as SectionBenefitsProps & { type: 'info' };

  const buttons: SectionBenefitsProps['buttons'] = useMemo(() => {
    switch (buttonsExample) {
      case 'buttons':
        return [{ label: 'Button example 1', type: 'outline' }, { label: 'Button example 2' }];
      case 'links': {
        return [
          { label: 'Link example 1', href: '#' },
          { label: 'Link example 2', href: '#' },
        ];
      }
      default:
        return undefined;
    }
  }, [buttonsExample]);

  if (type === 'basic') {
    return (
      <SectionBenefits
        id={id}
        title={title}
        subtitle={subtitle}
        titleTag={titleTag}
        subtitleTag={subtitleTag}
        description={description}
        type={type}
        layoutType={layoutType}
        columnsConfig={columnsConfig}
        backgroundColor={backgroundColor}
        {...contentBasic}
        buttons={buttons}
        buttonsAlign={buttonsAlign}
        note={note}
      />
    );
  }

  if (type === 'product') {
    return (
      <SectionBenefits
        id={id}
        title={title}
        subtitle={subtitle}
        titleTag={titleTag}
        subtitleTag={subtitleTag}
        description={description}
        type={type}
        layoutType={layoutType}
        columnsConfig={columnsConfig}
        backgroundColor={backgroundColor}
        {...contentProduct}
        buttons={buttons}
        buttonsAlign={buttonsAlign}
        note={note}
      />
    );
  }

  return (
    <SectionBenefits
      id={id}
      title={title}
      titleTag={titleTag}
      description={description}
      type={type as 'info'}
      layoutType={layoutType}
      columnsConfig={columnsConfig}
      outline={propsForTypeInfo.outline}
      backgroundColor={backgroundColor}
      {...contentInfo}
      buttons={buttons}
      buttonsAlign={buttonsAlign}
      note={note}
    />
  );
};

export const benefits: StoryObj<StoryProps> = {
  render: Template,
  args: {
    id: 'section-benefits',
    title: 'Section Title',
    subtitle: 'Section Subtitle',
    description: 'description',
    type: 'basic',
    layoutType: 'desktop',
    backgroundColor: 'neutral-background',
    columnsConfig: {
      desktop: { amount: 4, minWidth: 298 },
      desktopSmall: { amount: 3, minWidth: 298 },
      tablet: { amount: 2, minWidth: 348 },
      mobile: { amount: 1, minWidth: 328 },
    },
    withTabs: true,
    note: ' *iKS-Consulting, 2024; CNews Analytics, 2024<br/>**Из топ-200 мощнейших суперкомпьютеров в мире',
  },
  argTypes: {
    outline: { if: { arg: 'type', eq: 'info' } },
    withTabs: { name: '[Story]: With tabs' },
    buttonsExample: {
      name: '[Story]: Footer button or link example',
      options: ['buttons', 'links', undefined],
      control: { type: 'select' },
    },
    buttons: { table: { disable: true } },
  },
  parameters: {
    readme: { sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog] },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/pCLrU1Wg1VsoMQGLmH1J8t/%5BLIB%5D%5BSITE%5D-Product-UI-Kit?node-id=7235-326832&t=153GObcrGkYiqEwO-0',
    },
  },
};
