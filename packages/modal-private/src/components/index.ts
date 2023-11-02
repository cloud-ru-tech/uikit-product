import { Container as ModalPrivateContainer } from './Container';
import { Content as ModalPrivateContent } from './Content';
import { Footer as ModalPrivateFooter } from './Footer';
import { Header as ModalPrivateHeader } from './Header';

export namespace ModalPrivate {
  export const Container = ModalPrivateContainer;
  export const Header = ModalPrivateHeader;
  export const Content = ModalPrivateContent;
  export const Footer = ModalPrivateFooter;
}

export type { ContainerProps } from './Container';
export type { HeaderProps, SubtitleRenderProps } from './Header';
export type { ContentProps } from './Content';
export type { FooterProps } from './Footer';

export { Size, Variant } from './Container';
export { HeaderAlign } from './Header';
export { FooterAlign } from './Footer';
