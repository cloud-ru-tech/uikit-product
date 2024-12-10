export type FooterLink = {
  text: string;
  url: string;
  target?: '_self' | '_blank';
};

export type LinksBlock = {
  title: string;
  links: FooterLink[];
};

export type FooterBlock = {
  blocks: LinksBlock[];
};
