import { CounterTypes, Sizes } from '../helpers/types';
import { Container as TabContainer, ContainerProps as TabContainerProps } from './Container';
import { Content as TabContent, ContentProps as TabContentProps } from './Content';
import { NavigationItem as TabNavigationItem, NavigationItemProps as TabNavigationItemProps } from './NavigationItem';
import { NavigationList, NavigationListProps } from './NavigationList';

export namespace Tabs {
  export const Container = TabContainer;
  export type ContainerProps = TabContainerProps;
  export const NavigationItem = TabNavigationItem;
  export type NavigationItemProps = TabNavigationItemProps;
  export const Navigation = NavigationList;
  export type NavigationProps = NavigationListProps;
  export const Content = TabContent;
  export type ContentProps = TabContentProps;

  export const sizes = Sizes;
  export const counterTypes = CounterTypes;
}
