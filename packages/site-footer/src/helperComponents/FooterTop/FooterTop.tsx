import { MouseEvent } from 'react';

import { WithLayoutType } from '@cloud-ru/uikit-product-utils';

import { FOOTER_ELEMENT } from '../../constants';
import { useFooterClick } from '../../hooks';
import { type FooterHandlers, type FooterLocaleOption } from '../../types';
import { isExternalUrl } from '../../utils';
import { LocaleSwitcher } from '../LocaleSwitcher';
import { Logo } from '../Logo';
import styles from './styles.module.scss';

export type FooterTopProps = WithLayoutType<
  FooterHandlers & {
    logoUrl: string;
    locales: FooterLocaleOption[];
    currentLocaleId?: string;
    onLocaleChange?(locale: FooterLocaleOption): void;
  }
>;

export function FooterTop({
  logoUrl,
  locales,
  layoutType,
  currentLocaleId,
  onLocaleChange,
  onElementClick,
  onNavigate,
}: FooterTopProps) {
  const handleClick = useFooterClick({ onElementClick, onNavigate });

  const onLogoClick = (event: MouseEvent<HTMLElement>) =>
    handleClick(
      { element: FOOTER_ELEMENT.Logo, text: 'Logo', url: logoUrl, isExternal: isExternalUrl(logoUrl) },
      event,
    );

  return (
    <div className={styles.root} data-layout-type={layoutType} data-qa='footer-top'>
      <a className={styles.logoLink} href={logoUrl} data-qa='footer-logo' onClick={onLogoClick}>
        <Logo className={styles.logo} />
      </a>

      <LocaleSwitcher
        locales={locales}
        currentLocaleId={currentLocaleId}
        onLocaleChange={onLocaleChange}
        onElementClick={onElementClick}
      />
    </div>
  );
}
