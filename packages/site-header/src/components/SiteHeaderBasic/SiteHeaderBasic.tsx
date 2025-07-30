import cn from 'classnames';
import { MouseEvent, ReactNode, useRef } from 'react';

import { Layout } from '@sbercloud/uikit-product-site-layout';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { ButtonBurger, LogoContent, MobileMenu } from '../../helperComponents';
import { useHeaderPosition } from '../../hooks';
import styles from './styles.module.scss';

export type AdditionalLogoText = {
  /** Дополнительный текст Логотипа */
  text?: string;
  /** Переход по ссылке по дополнительному тексту Логотипа */
  link?: string;
  /** Коллбэк по клику на дополнительный текс Логотипа */
  onClick?(event?: MouseEvent<HTMLAnchorElement>): void;
};

export type Logo = {
  /** Переход по ссылке Логотипа */
  logoLink?: string;
  /** Коллбэк по клику на Логотип */
  onClick?(event?: MouseEvent<HTMLAnchorElement>): void;
};

export type HeaderProps = WithSupportProps<
  WithLayoutType<{
    /** Настройки текста справа Логотипа */
    additionalLogoText?: AdditionalLogoText;
    /** className root блока */
    className?: string;
    /** Флаг открытия мобильного меню */
    mobileMenuOpen: boolean;
    /** Настройки Логотипа */
    logo: Logo;
    /** Функция изменения флаг открытия мобильного меню */
    onSetMobileMenuOpen(open: boolean): void;
    /** Контент посередине (между логотипом и правым блоком) */
    middleContent?: ReactNode;
    /** Контент занимающий всю возможную ширину хэдера */
    fullWidthContent?: ReactNode;
    /** Контент справа (левее бургера) */
    rightContent?: ReactNode;
    /** Контент сверху над хэдером, для инфостроки */
    subHeader?: ReactNode;
    /** Контент мобильной версии меню */
    mobileMenuContent?: ReactNode;
    /** Нижний контент кнопок мобильной версии меню */
    mobileConsultationButton?: ReactNode;
  }>
>;

const HEIGHT_SUBHEADER = 25;

export function SiteHeaderBasic({
  className,
  additionalLogoText,
  middleContent,
  rightContent,
  mobileMenuContent,
  subHeader,
  fullWidthContent,
  layoutType,
  mobileConsultationButton,
  mobileMenuOpen,
  onSetMobileMenuOpen,
  logo,
  ...rest
}: HeaderProps) {
  const refHeader = useRef<HTMLDivElement>(null);
  const { showHeader, headerHeight } = useHeaderPosition(mobileMenuOpen, refHeader);

  const isMobileTabletView = layoutType === 'mobile' || layoutType === 'tablet';
  const isMobile = layoutType === 'mobile';

  return (
    <Layout.Header
      style={{
        transform: `translateY(-${!showHeader ? headerHeight + HEIGHT_SUBHEADER : 0}px)`,
      }}
      className={cn(styles.root, className)}
      data-attr='layout-header'
      {...extractSupportProps(rest)}
    >
      {subHeader}
      <div ref={refHeader} className={cn(styles.headerMaster, styles.dividerHeader)} data-layout-type={layoutType}>
        <div className={styles.headerPartsContainer}>
          {fullWidthContent ?? (
            <>
              <div className={styles.leftPart} data-layout-type={layoutType}>
                <LogoContent additionalLogoText={additionalLogoText} isMobile={isMobile} logo={logo} />
              </div>
              <div className={styles.middlePart}>{middleContent}</div>
              <div className={styles.rightPart}>
                {rightContent}
                {mobileMenuContent && isMobileTabletView && (
                  <>
                    <ButtonBurger
                      mobileMenuOpen={mobileMenuOpen}
                      onClick={() => onSetMobileMenuOpen(!mobileMenuOpen)}
                    />
                    <MobileMenu
                      mobileConsultationButton={mobileConsultationButton}
                      mobileMenuContent={mobileMenuContent}
                      mobileMenuOpen={mobileMenuOpen}
                      onClickForCloseMobileMenu={() => onSetMobileMenuOpen(false)}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout.Header>
  );
}
