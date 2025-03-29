import { CardBasicProps, CardInfoProps } from '@sbercloud/uikit-product-site-cards';

import { SectionBasicProps } from '../SectionBasic';

type CardBasicArray = Omit<CardBasicProps, 'layoutType'>[];
type CardInfoArray = Omit<CardInfoProps, 'layoutType'>[];
type CardNumericArray = Omit<CardInfoProps, 'layoutType' | 'icon'>[];

type ContentBasicTab = {
  tabValue: string;
  cards: CardBasicArray;
};

type ContentInfoTab = {
  tabValue: string;
  cards: CardInfoArray;
};

type ContentNumericTab = {
  tabValue: string;
  cards: CardNumericArray;
};

type ContentBasicWithoutTabs = {
  type: 'basic';
  content: CardBasicArray;

  tabBarItems?: never;
};

type ContentBasicWithTabs = {
  type: 'basic';
  content: ContentBasicTab[];

  tabBarItems: NonNullable<SectionBasicProps['tabBarItems']>;
};

type ContentNumericWithoutTabs = {
  type: 'numeric';
  content: CardNumericArray;

  tabBarItems?: never;
};

type ContentNumericWithTabs = {
  type: 'numeric';
  content: ContentNumericTab[];

  tabBarItems: NonNullable<SectionBasicProps['tabBarItems']>;
};

type ContentInfoWithoutTabs = {
  type: 'info';
  outline?: boolean;
  content: CardInfoArray;

  tabBarItems?: never;
};

type ContentInfoWithTabs = {
  type: 'info';
  outline?: boolean;
  content: ContentInfoTab[];

  tabBarItems: NonNullable<SectionBasicProps['tabBarItems']>;
};

export type ContentBasic = ContentBasicWithTabs | ContentBasicWithoutTabs;
export type ContentInfo = ContentInfoWithTabs | ContentInfoWithoutTabs;
export type ContentNumeric = ContentNumericWithTabs | ContentNumericWithoutTabs;
