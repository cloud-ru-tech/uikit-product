import { LanguageCodeType, useLanguage } from '@sbercloud/uikit-product-utils';
import { Link } from '@snack-uikit/link';

import { textProvider, Texts } from '../../helpers';
import { Platform } from './types';

export type PlatformLinkProps = {
  platform: Platform;
  handlePlatformClick(): void;
};

const mapPlatform = (platform: Platform, languageCode: LanguageCodeType) => {
  switch (platform) {
    case 'advanced':
      return {
        href: '/advanced', // TODO: validate this approach
        text: textProvider<string>(languageCode, Texts.Advanced),
      };
    case 'mlspace':
      return {
        href: '/mlspace',
        text: textProvider<string>(languageCode, Texts.Mlspace),
      };
    case 'evolution':
      return {
        href: '/evolution',
        text: textProvider<string>(languageCode, Texts.Evolution),
      };
    case 'vmware':
      return {
        href: '/vmware',
        text: textProvider<string>(languageCode, Texts.Vmware),
      };

    default:
      return {
        href: '',
        text: '',
      };
  }
};

export function PlatformLink({ platform, handlePlatformClick }: PlatformLinkProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  return (
    <Link
      {...mapPlatform(platform, languageCode)}
      onClick={handlePlatformClick}
      size='l'
      textMode='accent'
      appearance='neutral'
    />
  );
}
