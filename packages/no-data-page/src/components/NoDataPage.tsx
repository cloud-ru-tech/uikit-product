import { cloneElement, useMemo } from 'react';

import { NoDataPageVariants } from '../helpers/types';
import * as S from './styled';

export interface NoDataPageProps {
  type?: NoDataPageVariants;
  icon?: React.ReactElement;
  title?: string;
  children?: React.ReactNode;
}

const iconSize = {
  [NoDataPageVariants.Large]: 160,
  [NoDataPageVariants.Small]: 100,
};

export const NoDataPage = ({ type = NoDataPageVariants.Large, icon, title, children }: NoDataPageProps) => {
  const customIcon = useMemo(
    () =>
      icon
        ? cloneElement(icon, {
            className: S.iconClassName,
            size: iconSize[type],
          })
        : null,
    [icon],
  );

  return (
    <S.Container>
      <S.IconContainer>{customIcon}</S.IconContainer>
      <S.DescContainer>
        <S.Title>{title}</S.Title>
        {children}
      </S.DescContainer>
    </S.Container>
  );
};

NoDataPage.variants = NoDataPageVariants;
