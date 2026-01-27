import cn from 'classnames';

import { CloudFullLogoSVG } from '@cloud-ru/uikit-product-icons';
import { WithLayoutType } from '@cloud-ru/uikit-product-utils';
import { Divider } from '@snack-uikit/divider';
import { Typography } from '@snack-uikit/typography';

import { LocaleSwitcher } from '../LocaleSwitcher';
import { SocialButtons } from '../SocialButtons';
import { Wrapper } from '../Wrapper';
import { BODY_BLOCKS, BOTTOM_LINKS } from './constants';
import styles from './styles.module.scss';
import { FooterBlock, FooterLink, LinksBlock } from './types';
import { genStringForUrl as transliteration } from './utils';

type SiteFooterProps = WithLayoutType<{
  className?: string;
}>;

const renderFooterLink = ({ url, text, target }: FooterLink) => {
  const id = `layout-footer-link-${transliteration(text)}`;

  return (
    <li className={styles.footerLinkWrapper} key={id}>
      <a className={styles.footerLink} href={url} target={target} data-test-id={id}>
        <Typography.SansBodyM className={styles.footerLinkText}>{text}</Typography.SansBodyM>
      </a>
    </li>
  );
};

const renderLinksBlock = ({ title, links }: LinksBlock, i: number) => (
  <div key={String(i)}>
    <Typography.SansLabelL className={styles.footerTitle} tag='h3'>
      {title}
    </Typography.SansLabelL>
    <ul className={styles.footerLinks}>{links.map(renderFooterLink)}</ul>
  </div>
);

const renderFooterBlock = (block: FooterBlock, i: number) => (
  <div key={String(i)} className={styles.footerBlock}>
    {block.blocks.map(renderLinksBlock)}
  </div>
);

export function SiteFooter({ layoutType, className }: SiteFooterProps) {
  return (
    <Wrapper layoutType={layoutType} className={cn(styles.footerWrapper, className)}>
      <div className={styles.footerTop}>
        <a className={styles.footerLogoLink} href='/' data-qa='footer-logo' id='layout-footer-logo-link'>
          <CloudFullLogoSVG className={styles.footerLogo} />
        </a>
        <LocaleSwitcher />
      </div>

      <div className={styles.footerBody}>{BODY_BLOCKS.map(renderFooterBlock)}</div>

      <Divider />

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomItem}>
          <Typography className={styles.footerCopyright} family='sans' purpose='body' size='m'>
            &copy;&nbsp;{new Date().getFullYear()}&nbsp;Cloud.ru
          </Typography>
        </div>
        <div className={cn(styles.footerBottomItem, styles.footerBottomLinks)}>
          {BOTTOM_LINKS.map(renderFooterLink)}
        </div>
        <div className={styles.footerBottomItem}>
          <SocialButtons classNameSocialButton={styles.footerBottomSocialButton} />
        </div>
      </div>
    </Wrapper>
  );
}
