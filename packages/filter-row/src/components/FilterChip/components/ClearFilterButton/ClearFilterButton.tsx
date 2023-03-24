import { MouseEventHandler } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';

import * as S from './styled';

type ClearFilterButtonProps = {
  onClick(): void;
};

export function ClearFilterButton({ onClick }: ClearFilterButtonProps) {
  const handleClick: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    onClick();
  };

  return (
    <S.ClearButtonContainer onClickCapture={handleClick}>
      <ButtonIcon icon={<CloseInterfaceSVG />} variant={ButtonIcon.variants.Strong} />
    </S.ClearButtonContainer>
  );
}
