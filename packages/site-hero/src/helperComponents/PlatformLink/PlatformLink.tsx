import { useMemo } from 'react';

import { useLocale } from '@sbercloud/uikit-product-locale';
import { Link } from '@snack-uikit/link';

import { Platform } from './types';

export type PlatformLinkProps = {
  platform: Platform;
  handlePlatformClick(): void;
};

export function PlatformLink({ platform, handlePlatformClick }: PlatformLinkProps) {
  const { t } = useLocale('SiteHero');

  const platformProps = useMemo(() => {
    switch (platform) {
      case 'advanced':
        return {
          href: '/advanced',
          text: t('Main.advanced'),
        };
      case 'mlspace':
        return {
          href: '/mlspace',
          text: t('Main.mlspace'),
        };
      case 'evolution':
        return {
          href: '/evolution',
          text: t('Main.evolution'),
        };
      case 'vmware':
        return {
          href: '/vmware',
          text: t('Main.vmware'),
        };

      default:
        return {
          href: '',
          text: '',
        };
    }
  }, [platform, t]);

  return <Link {...platformProps} onClick={handlePlatformClick} size='l' textMode='accent' appearance='neutral' />;
}
