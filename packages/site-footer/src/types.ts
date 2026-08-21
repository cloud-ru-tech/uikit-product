import { MouseEvent, MouseEventHandler } from 'react';

import { ValueOf } from '@snack-uikit/utils';

import { FOOTER_ELEMENT } from './constants';

export type SocialNetworkShortName = 'vk' | 'tg' | 'max' | 'yt' | 'hb';

export type FooterLinkTarget = '_self' | '_blank';

export type FooterElement = ValueOf<typeof FOOTER_ELEMENT>;

export type FooterClickPayload = {
  element: FooterElement;
  id?: string;
  text: string;
  url?: string;
  target?: FooterLinkTarget;
  isExternal: boolean;
};

export type FooterElementClickHandler = (payload: FooterClickPayload) => void;

export type FooterNavigateHandler = (url: string, event: MouseEvent<HTMLElement>) => void;

export type FooterHandlers = {
  onElementClick?: FooterElementClickHandler;
  onNavigate?: FooterNavigateHandler;
};

export type FooterLinkItem = {
  text: string;
  url?: string;
  target?: FooterLinkTarget;
  id?: string;
  onClick?: MouseEventHandler<HTMLElement>;
};

export type FooterSectionItem = {
  title: string;
  titleUrl?: string;
  titleTarget?: FooterLinkTarget;
  id?: string;
  links: FooterLinkItem[];
};

export type FooterColumn = {
  sections: FooterSectionItem[];
};

export type FooterSubscribeContent = {
  title: string;
  description: string;
  buttonLabel: string;
  url: string;
};

export type FooterLocaleOption = {
  id: string;
  content: string;
  href: string;
};

export type FooterSocialItem = {
  name: SocialNetworkShortName;
  url: string;
  label?: string;
};

export type FooterContent = {
  logoUrl: string;
  locales: FooterLocaleOption[];
  subscribe: FooterSubscribeContent;
  columns: FooterColumn[];
  bottomLinks: FooterLinkItem[];
  socials: FooterSocialItem[];
  copyrightOwner: string;
};
