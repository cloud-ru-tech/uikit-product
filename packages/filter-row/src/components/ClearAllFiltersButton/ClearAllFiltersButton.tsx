import { ButtonGhost } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';

type ClearFilterButtonProps = {
  onClick(): void;
};

export function ClearAllFiltersButton({ onClick }: ClearFilterButtonProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <ButtonGhost
      variant={ButtonGhost.variants.Tertiary}
      icon={<CloseInterfaceSVG />}
      iconPosition={ButtonGhost.iconPosition.Before}
      text={textProvider(languageCode, Texts.ClearFilters)}
      onClick={onClick}
    />
  );
}
