import { MouseEvent } from 'react';

import { keyboardSelectHandler } from '@sbercloud/uikit-utils';

import { styledPaginationButton } from './styled';
import { PaginationButtonProps } from './types';

function StylelessPaginationButton({ children, className, rel, onClick, ...rest }: PaginationButtonProps) {
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    onClick();
  }

  return (
    <a
      role='button'
      className={className}
      onClick={handleClick}
      onKeyDown={keyboardSelectHandler(onClick)}
      rel={rel}
      tabIndex={0}
      {...rest}
    >
      {children}
    </a>
  );
}

export type { PaginationButtonProps };

export const PaginationButton = styledPaginationButton(StylelessPaginationButton);
