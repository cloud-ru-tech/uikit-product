import { ReactNode, useCallback, useMemo, useState } from 'react';

import { ChevronRightSVG, DaySVG, LaptopPhoneSVG, NightSVG, ThemeContrastSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { MobileModalCustom } from '@cloud-ru/uikit-product-mobile-modal';
import { DroplistProps, List } from '@snack-uikit/list';

import { THEME_MODE, ThemeMode, ThemeProps } from '../types';

export function useThemeItem({
  value: themeMode,
  onChange,
  isMobile,
  onClose,
}: ThemeProps & { isMobile?: boolean; onClose?(): void }): DroplistProps['items'][0] {
  const { t } = useLocale('Header');

  const [open, setOpen] = useState(false);

  const handleClick = useCallback(
    (themeMode: ThemeMode) => () => {
      onChange?.(themeMode);
      !isMobile && onClose?.();
    },
    [isMobile, onChange, onClose],
  );

  const themeModeOptions = useMemo(
    () => [
      {
        beforeContent: <DaySVG />,
        content: {
          option: t('themeModeLight'),
        },
        onClick: handleClick(THEME_MODE.Light),
        checked: themeMode === THEME_MODE.Light,
        'data-test-id': 'header__user-menu__theme-mode__light-option',
      },
      {
        beforeContent: <NightSVG />,
        content: {
          option: t('themeModeDark'),
        },
        checked: themeMode === THEME_MODE.Dark,
        onClick: handleClick(THEME_MODE.Dark),
        'data-test-id': 'header__user-menu__theme-mode__dark-option',
      },
      {
        beforeContent: <LaptopPhoneSVG />,
        content: {
          option: t('themeModeSystem'),
        },
        checked: themeMode === THEME_MODE.System,
        onClick: handleClick(THEME_MODE.System),
        'data-test-id': 'header__user-menu__theme-mode__system-option',
      },
    ],
    [handleClick, t, themeMode],
  );

  const themeItem = useMemo(
    () => ({
      type: 'next-list',
      content: {
        option: t('themeModeLabel'),
      },
      placement: 'left-start',
      beforeContent: <ThemeContrastSVG />,
      'data-test-id': 'header__user-menu__theme-mode',
      items: themeModeOptions,
    }),
    [t, themeModeOptions],
  );

  const mobileThemeItem = useMemo(
    () => ({
      id: 'header__user-menu__theme-mode',
      beforeContent: <ThemeContrastSVG />,
      'data-test-id': 'header__user-menu__theme-mode',
      afterContent: (
        <span
          style={{
            color: 'var(--sys-neutral-text-light)',
          }}
        >
          <ChevronRightSVG />
        </span>
      ),
      content: {
        option: t('themeModeLabel'),
      },
      onClick: () => {
        setOpen(true);
      },
      itemWrapRender: (node: ReactNode) => (
        <>
          {node}
          <MobileModalCustom
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            closeButtonEnabled
            closeOnPopstate
          >
            <MobileModalCustom.Header title={t('themeModeLabel')} />
            <List items={themeModeOptions} size='l' selection={{ mode: 'single', value: themeMode }} />
          </MobileModalCustom>
        </>
      ),
    }),
    [open, t, themeMode, themeModeOptions],
  );

  return isMobile ? mobileThemeItem : themeItem;
}
