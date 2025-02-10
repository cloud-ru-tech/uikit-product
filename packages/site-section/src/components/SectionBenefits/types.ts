import { CardBasicProps, CardInfoProps } from '@sbercloud/uikit-product-site-cards';

import { SectionBasicProps } from '../SectionBasic';

type CardBasicArray = Omit<CardBasicProps, 'layoutType'>[];
type CardInfoArray = Omit<CardInfoProps, 'layoutType'>[];

type ContentBasicTab = {
  tabValue: string;
  cardBasicItems: CardBasicArray;
};

type ContentInfoTab = {
  tabValue: string;
  cardInfoItems: CardInfoArray;
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

type ContentInfoWithoutTabs = {
  type: 'info';
  content: CardInfoArray;

  tabBarItems?: never;
};

type ContentInfoWithTabs = {
  type: 'info';
  content: ContentInfoTab[];

  tabBarItems: NonNullable<SectionBasicProps['tabBarItems']>;
};

export type ContentBasic = ContentBasicWithTabs | ContentBasicWithoutTabs;
export type ContentInfo = ContentInfoWithTabs | ContentInfoWithoutTabs;
