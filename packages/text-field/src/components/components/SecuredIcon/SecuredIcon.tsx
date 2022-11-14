import { ButtonIconTransparent } from '@sbercloud/uikit-product-button';
import { EyeClosedInterfaceSVG, EyeOpenedInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../../helpers/texts-provider';

export type SecuredIconProps = {
  loading: boolean;
  disabled: boolean;
  isSecured: boolean;
  onShowSecuredIconClick: () => Promise<void>;
  hideSecuredText: () => void;
};

export const SecuredIcon = ({
  loading,
  disabled,
  isSecured,
  onShowSecuredIconClick,
  hideSecuredText,
}: SecuredIconProps) => {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <ButtonIconTransparent
      data-test-id='text-field__show-hide-button'
      disabled={disabled}
      variant={ButtonIconTransparent.variants.Default}
      onClick={isSecured ? onShowSecuredIconClick : hideSecuredText}
      icon={
        <>
          {loading && <PredefinedIconsPrivate icon={PredefinedIconsPrivate.icons.Loading} />}
          {!loading && isSecured && <EyeOpenedInterfaceSVG />}
          {!loading && !isSecured && <EyeClosedInterfaceSVG />}
        </>
      }
      tooltip={{
        content: textProvider(languageCode, isSecured ? Texts.Show : Texts.Hide),
        placement: ButtonIconTransparent.placements.Top,
      }}
    />
  );
};
