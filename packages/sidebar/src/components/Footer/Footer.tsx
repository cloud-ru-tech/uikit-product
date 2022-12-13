import { ButtonGhost, ButtonIcon } from '@sbercloud/uikit-product-button';
import { Divider } from '@sbercloud/uikit-product-divider';
import { MenuCloseInterfaceSVG, MenuOpenedInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { useSidebarContext } from '../../contexts';
import { textProvider, Texts } from '../../helpers';
import { List } from '../List';
import { SidebarProps } from '../Sidebar';
import * as S from './styled';

type FooterProps = {
  items: SidebarProps['footerItems'];
};

export function Footer({ items }: FooterProps) {
  const { isSearchDirty, isCollapsed, collapse, uncollapse } = useSidebarContext();
  const { languageCode } = useLanguage();

  if (isSearchDirty) return null;

  return (
    <S.Footer>
      {items?.length && (
        <>
          <Divider />

          <List level={{ list: [{ items }], depth: 0, children: [] }} isFooter />
        </>
      )}

      {isCollapsed ? (
        <Tooltip
          content={textProvider(languageCode, Texts.UncollapseMenu)}
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
            text={textProvider(languageCode, Texts.CollapseMenu)}
            icon={<MenuCloseInterfaceSVG />}
            onClick={collapse}
            data-test-id='sidebar__footer__collapse-button'
          />
        </S.ButtonWrapper>
      )}
    </S.Footer>
  );
}
