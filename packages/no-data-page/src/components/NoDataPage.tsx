import { cloneElement, useMemo } from 'react';

import { useMatchMedia } from '@sbercloud/uikit-product-utils';

import { NoDataPageVariants } from '../helpers/types';
import * as S from './styled';

export type NoDataPageProps = {
  type?: NoDataPageVariants;
  icon?: React.ReactElement;
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

const MOBILE_ICON_SIZE = 48;

const iconSize = {
  [NoDataPageVariants.Large]: 160,
  [NoDataPageVariants.Small]: 100,
};

export function NoDataPage({ type = NoDataPageVariants.Large, icon, title, className, children }: NoDataPageProps) {
  const { isMobile } = useMatchMedia();

  const customIcon = useMemo(
    () =>
      icon
        ? cloneElement(icon, {
            className: S.iconClassName,
            size: isMobile ? MOBILE_ICON_SIZE : iconSize[type],
          })
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [icon, isMobile],
  );

  return (
    <S.Container className={className}>
      <S.IconContainer>{customIcon}</S.IconContainer>
      <S.DescContainer>
        <S.Title>{title}</S.Title>
        {children}
      </S.DescContainer>
    </S.Container>
  );
}

NoDataPage.variants = NoDataPageVariants;
