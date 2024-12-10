import cn from 'classnames';
import { useState } from 'react';

import { CloudFullLogoSVG } from '@sbercloud/uikit-product-icons';
import { WithLayoutType } from '@sbercloud/uikit-product-utils';
import { ButtonFilled, ButtonFunction } from '@snack-uikit/button';

import { Menu } from '../Menu';
import { BurgerButton, HeaderSearchInput, SubHeader } from './components';
import { consoleRedirectUrl, HEADER_DESKTOP_WIDTH, MENU_ITEMS } from './constants';
import { useFormatConsoleUrl, useHeaderPosition, useWindowWidth } from './hooks';
import styles from './styles.modules.scss';

type HeaderProps = WithLayoutType<{
  className?: string;
  showLayoutBanner?: boolean;
  withoutHeaderShadow?: boolean;
  staticHeader?: boolean;
  withConsultationButton?: boolean;
}>;

export function SiteHeader({
  className = '',
  showLayoutBanner = true,
  withoutHeaderShadow,
  withConsultationButton = true,
  staticHeader = false,
  layoutType,
}: HeaderProps) {
  const [globalSearchIsVisible, setGlobalSearchIsVisible] = useState(false);
  const [isModalMenuOpen, setIsModalMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const { windowWidth } = useWindowWidth();
  const { showHeader, showSubheader, setShowSubheader, headerPosition, headerHeight } = useHeaderPosition(
    staticHeader,
    isModalMenuOpen,
    isBurgerOpen,
  );

  const onConsultationClickHandler = () => {
    setActiveMenuItem(null);
    setIsBurgerOpen(false);
    setIsModalMenuOpen(false);
    setGlobalSearchIsVisible(false);
  };

  const onBurgerClickHandler = () => {
    setIsModalMenuOpen(false);
    setActiveMenuItem(null);
    setGlobalSearchIsVisible(false);
    setIsBurgerOpen(prev => !prev);
  };

  const onClickOnMenuItemHandler = () => {
    setGlobalSearchIsVisible(false);
  };

  const logInUrl = useFormatConsoleUrl(consoleRedirectUrl, 'header', 'В консоль');

  return (
    <div
      className={cn(styles.root, className, {
        [styles.shadow]: (headerPosition > 50 && !withoutHeaderShadow) || globalSearchIsVisible,
        [styles.withSubHeader]: showSubheader,
      })}
      style={{
        transform: `translateY(-${!showHeader ? headerHeight : 0}px)`,
      }}
      data-attr='layout-header'
      data-mobile={(windowWidth && windowWidth < HEADER_DESKTOP_WIDTH) || undefined}
    >
      {showLayoutBanner && (
        <SubHeader layoutType={layoutType} setShowSubheader={setShowSubheader} showSubheader={showSubheader} />
      )}
      <div className={styles.headerTop}>
        <div className={styles.wrapper}>
          <a className={styles.logoWrapper} href='/' id='layout-header-logo-link'>
            <CloudFullLogoSVG className={styles.logo} />
          </a>

          {windowWidth && windowWidth > HEADER_DESKTOP_WIDTH && (
            <Menu
              setIsModalMenuOpen={setIsModalMenuOpen}
              activeMenuItem={activeMenuItem}
              setActiveMenuItem={setActiveMenuItem}
              items={MENU_ITEMS}
              onClick={onClickOnMenuItemHandler}
              className={styles.menuDesktop}
            />
          )}

          {windowWidth && windowWidth > HEADER_DESKTOP_WIDTH && (
            <HeaderSearchInput onClick={() => {}} active={globalSearchIsVisible} />
          )}

          <div className={styles.buttonsWrapper}>
            {windowWidth && windowWidth < HEADER_DESKTOP_WIDTH && (
              <HeaderSearchInput onClick={() => {}} active={globalSearchIsVisible} />
            )}

            {windowWidth && windowWidth > HEADER_DESKTOP_WIDTH && withConsultationButton && (
              <ButtonFunction
                size='m'
                label='Связаться с нами'
                onClick={() => {
                  onConsultationClickHandler();
                }}
              />
            )}

            <ButtonFilled
              className={styles.consoleButton}
              label='В консоль'
              appearance='primary'
              size='m'
              href={logInUrl}
              data-abt='login'
            />

            {windowWidth && windowWidth < HEADER_DESKTOP_WIDTH && (
              <BurgerButton onClick={onBurgerClickHandler} isBurgerOpen={isBurgerOpen} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
