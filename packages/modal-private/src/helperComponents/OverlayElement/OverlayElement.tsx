import { MouseEventHandler, ReactElement } from 'react';

import * as S from './styled';

export type OverlayElementProps = {
  onClose(): void;
  content: ReactElement;
  hasBlur: boolean;
};

export function OverlayElement({ onClose, content, hasBlur }: OverlayElementProps) {
  const handleClick: MouseEventHandler = e => {
    e.stopPropagation();
    onClose();
  };

  return (
    <>
      <S.StyledOverlayPrivate hasBlur={hasBlur} onClick={handleClick} data-test-id='modal-private__overlay' />
      {content}
    </>
  );
}
