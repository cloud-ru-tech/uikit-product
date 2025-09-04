import { MainMenuSVG } from '@sbercloud/uikit-product-icons';
import { ButtonFunction } from '@snack-uikit/button';
import { useValueControl } from '@snack-uikit/utils';

import { MenuDesktop } from './MenuDesktop';
import { MenuMobile } from './MenuMobile';
import { MainMenuProps } from './types';

export function MainMenu({
  open: openProp,
  setOpen: setOpenProp,
  settingItems,
  leftTop,
  rightTop,
  serviceGroups,
  favorite,
  search,
  isMobile,
  onLinkChange,
  disabled,
}: MainMenuProps & { disabled?: boolean }) {
  const [open = false, setOpen] = useValueControl<boolean>({ value: openProp, onChange: setOpenProp });

  const MenuComponent = isMobile ? MenuMobile : MenuDesktop;

  return (
    <>
      <ButtonFunction
        disabled={disabled}
        size='m'
        icon={<MainMenuSVG />}
        onClick={() => {
          setOpen(true);
        }}
        data-test-id='header__drawer-menu-button'
      />

      <MenuComponent
        onLinkChange={onLinkChange}
        settingItems={settingItems}
        serviceGroups={serviceGroups}
        search={search}
        leftTop={leftTop}
        rightTop={rightTop}
        favorite={favorite}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
