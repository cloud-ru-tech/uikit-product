import { ButtonGhost, ButtonIcon } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';
import { MenuCloseInterfaceSVG, MenuOpenedInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../../helpers';
import { useSidebarContext } from '../../context';
import { SidebarProps } from '../../Sidebar';
import { SidebarList } from '../SidebarList';
import * as S from './styled';

type SidebarFooterProps = {
  items: SidebarProps['footerItems'];
};

export function SidebarFooter({ items }: SidebarFooterProps) {
  const { isSearchDirty, isCollapsed, collapse, uncollapse } = useSidebarContext();
  const { languageCode } = useLanguage();

  if (isSearchDirty) return null;

  return (
    <S.Footer>
      {items?.length && (
        <>
          <Divider />

          <SidebarList levelIndex={0} list={[{ items }]} isFooter />
        </>
      )}

      {isCollapsed ? (
        <Tooltip
          content={textProvider(languageCode, Texts.SidebarUncollapseMenu)}
          type={Tooltip.types.Tip}
          placement={Tooltip.placements.Right}
        >
          <S.ButtonWrapper>
            <ButtonIcon
              icon={<MenuOpenedInterfaceSVG />}
              variant={ButtonIcon.variants.Color}
              onClick={uncollapse}
              data-test-id='sidebar__footer__uncollapse-button'
            />
          </S.ButtonWrapper>
        </Tooltip>
      ) : (
        <S.ButtonWrapper>
          <ButtonGhost
            variant={ButtonGhost.variants.Tertiary}
            iconPosition={ButtonGhost.iconPosition.Before}
            text={textProvider(languageCode, Texts.SidebarCollapseMenu)}
            icon={<MenuCloseInterfaceSVG />}
            onClick={collapse}
            data-test-id='sidebar__footer__collapse-button'
          />
        </S.ButtonWrapper>
      )}
    </S.Footer>
  );
}
