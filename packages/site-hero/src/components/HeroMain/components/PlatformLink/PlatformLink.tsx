import { MouseEvent } from 'react';

import { Link } from '@snack-uikit/link';

type Platform = {
  id?: string;
  title: string;
  href: string;
};

export type PlatformLinkProps = {
  platform: Platform;
  handlePlatformClick(e: MouseEvent<HTMLAnchorElement>, platform: Platform): void;
};

export function PlatformLink({ platform, handlePlatformClick }: PlatformLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    handlePlatformClick(e, platform);
  };

  return (
    <Link
      text={platform.title}
      href={platform.href}
      onClick={handleClick}
      size='l'
      textMode='accent'
      appearance='neutral'
    />
  );
}
