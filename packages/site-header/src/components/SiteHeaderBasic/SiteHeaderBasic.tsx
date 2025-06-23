import cn from 'classnames';
import { ReactNode, useRef } from 'react';

import { Layout } from '@sbercloud/uikit-product-site-layout';
import { extractSupportProps, WithLayoutType, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { ButtonBurger, LogoContent, MobileMenu } from '../../helperComponents';
import { useHeaderPosition } from '../../hooks';
import styles from './styles.module.scss';

export type HeaderProps = WithSupportProps<
  WithLayoutType<{
    /** Тест справа от Лого */
    logoContentText?: string;
    /** className root блока */
    className?: string;
    /** Флаг открытия мобильного меню */
    mobileMenuOpen: boolean;
    /** Ссылка по нажатию логотипа с текстом */
    logoLink: string;
    /** Функция изменения флаг открытия мобильного меню */
    onSetMobileMenuOpen: (open: boolean) => void;
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
  logoContentText,
  middleContent,
  rightContent,
  mobileMenuContent,
  subHeader,
  fullWidthContent,
  layoutType,
  mobileConsultationButton,
  mobileMenuOpen,
  onSetMobileMenuOpen,
  logoLink,
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
                <LogoContent logoContentText={logoContentText} isMobile={isMobile} logoLink={logoLink} />
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
