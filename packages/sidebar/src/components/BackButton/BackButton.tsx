import { ButtonGhost, ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG, MenuCloseFullInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { useSidebarContext } from '../../contexts';
import { textProvider, Texts } from '../../helpers';
import * as S from './styled';

type BackButtonProps = {
  levelIndex: number;
};

export function BackButton({ levelIndex }: BackButtonProps) {
  const { languageCode } = useLanguage();
  const { handleBackClick, isSearchShown, closeSearch, isCollapsed } = useSidebarContext();

  const backButtonText = textProvider(languageCode, levelIndex > 1 ? Texts.BackButton : Texts.BackToPlatforms);

  if (isCollapsed)
    return (
      <Tooltip content={backButtonText} type={Tooltip.types.Tip} placement={Tooltip.placements.Right}>
        <S.BackButtonWrapper>
          <ButtonIcon
            icon={<MenuCloseFullInterfaceSVG />}
            variant={ButtonIcon.variants.Color}
            onClick={handleBackClick}
            data-test-id='sidebar__header__back-button'
          />
        </S.BackButtonWrapper>
      </Tooltip>
    );

  return (
    <S.BackButtonWrapper>
      {isSearchShown ? (
        <ButtonGhost
          variant={ButtonGhost.variants.Tertiary}
          iconPosition={ButtonGhost.iconPosition.Before}
          text={textProvider(languageCode, Texts.CloseSearch)}
          icon={<CloseInterfaceSVG />}
          onClick={closeSearch}
          data-test-id='sidebar__header__close-search-button'
        />
      ) : (
        <ButtonGhost
          variant={ButtonGhost.variants.Tertiary}
          iconPosition={ButtonGhost.iconPosition.Before}
          text={backButtonText}
          icon={<MenuCloseFullInterfaceSVG />}
          onClick={handleBackClick}
          data-test-id='sidebar__header__back-button'
        />
      )}
    </S.BackButtonWrapper>
  );
}
