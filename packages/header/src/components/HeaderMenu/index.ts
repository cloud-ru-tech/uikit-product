import { HeaderMenuItem, HeaderMenuItemProps, HeaderMenuRoot, HeaderMenuRootProps } from './components';

export namespace HeaderMenu {
  export const Root = HeaderMenuRoot;
  export type RootProps = HeaderMenuRootProps;

  export const Item = HeaderMenuItem;
  export type ItemProps = HeaderMenuItemProps;
}
