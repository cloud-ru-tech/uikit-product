import { Layout } from '@cloud-ru/uikit-product-site-layout';
import { extractSupportProps, LAYOUT_TYPE, WithLayoutType, WithSupportProps } from '@cloud-ru/uikit-product-utils';

import { FooterBody, FooterBottom, FooterSubscribe, FooterTop } from '../helperComponents';
import { type FooterContent, type FooterHandlers, type FooterLocaleOption } from '../types';
import styles from './styles.module.scss';

export type SiteFooterProps = WithSupportProps<
  WithLayoutType<
    FooterHandlers & {
      /** Контент футера */
      content: FooterContent;
      /** Отключить кнопку подписки */
      disableSubscribe?: boolean;
      /** Идентификатор текущего языка. Значение по умолчанию - первый из content.locales */
      currentLocaleId?: string;
      /** Вызывается при смене языка */
      onLocaleChange?(locale: FooterLocaleOption): void;
    }
  >
>;

export function SiteFooter({
  content,
  disableSubscribe,
  layoutType,
  currentLocaleId,
  onLocaleChange,
  onElementClick,
  onNavigate,
  ...rest
}: SiteFooterProps) {
  const isDesktopSmallAndDesktop = layoutType === LAYOUT_TYPE.DesktopSmall || layoutType === LAYOUT_TYPE.Desktop;

  const subscribe = (
    <FooterSubscribe
      {...content.subscribe}
      layoutType={layoutType}
      disabled={disableSubscribe}
      onElementClick={onElementClick}
      onNavigate={onNavigate}
    />
  );

  return (
    <Layout.Footer
      layoutType={layoutType}
      className={styles.siteFooter}
      data-qa='footer'
      {...extractSupportProps(rest)}
    >
      <div className={styles.grid} data-layout-type={layoutType} data-qa='footer-grid'>
        <div className={styles.aside} data-qa='footer-aside'>
          <FooterTop
            layoutType={layoutType}
            logoUrl={content.logoUrl}
            locales={content.locales}
            currentLocaleId={currentLocaleId}
            onLocaleChange={onLocaleChange}
            onElementClick={onElementClick}
            onNavigate={onNavigate}
          />
          {isDesktopSmallAndDesktop && subscribe}
        </div>

        <FooterBody
          layoutType={layoutType}
          columns={content.columns}
          onElementClick={onElementClick}
          onNavigate={onNavigate}
        />
      </div>

      {!isDesktopSmallAndDesktop && subscribe}

      <FooterBottom
        layoutType={layoutType}
        links={content.bottomLinks}
        socials={content.socials}
        copyrightOwner={content.copyrightOwner}
        onElementClick={onElementClick}
        onNavigate={onNavigate}
      />
    </Layout.Footer>
  );
}
