import cn from 'classnames';

import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import {
  Footer,
  FooterProps as LayoutFooterProps,
  Header,
  HeaderProps as LayoutHeaderProps,
  Main,
  MainProps as LayoutMainProps,
  SectionWrapper,
  SectionWrapperProps,
} from '../helperComponents';
import styles from './styles.module.scss';
import { LayoutProps } from './types';

export function LayoutComponent({ children, meta, className, ...rest }: LayoutProps) {
  return (
    <>
      {meta}
      <div className={cn(styles.layout, className)} {...extractSupportProps(rest)}>
        {children}
      </div>
    </>
  );
}

export const Layout = LayoutComponent as typeof LayoutComponent & {
  Header: typeof Header;
  Main: typeof Main;
  Footer: typeof Footer;
  SectionWrapper: typeof SectionWrapper;
};

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;
Layout.SectionWrapper = SectionWrapper;

export namespace SiteLayout {
  export type HeaderProps = LayoutHeaderProps;
  export type MainProps = LayoutMainProps;
  export type FooterProps = LayoutFooterProps;
  export type WrapperProps = SectionWrapperProps;
}
