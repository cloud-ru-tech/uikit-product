import { ChevronLeftInterfaceSVG, ChevronRightInterfaceSVG } from '@sbercloud/uikit-react-icons';

import { Variants } from './constants';
import { Button } from './styled';

export type PaginationArrowButtonProps = {
  variant: Variants;
  disabled: boolean;
  onClick: (isPrev: boolean) => void;
};

export function PaginationArrowButton({ variant, disabled, onClick }: PaginationArrowButtonProps) {
  const isPrev = variant === Variants.Prev;

  function handleClick() {
    if (disabled) {
      return;
    }

    onClick(isPrev);
  }

  return (
    <Button
      onClick={handleClick}
      rel={variant}
      aria-disabled={disabled || undefined}
      data-disabled={disabled || undefined}
      data-test-id={`pagination-${variant}-arrow-button`}
    >
      {isPrev ? <ChevronLeftInterfaceSVG /> : <ChevronRightInterfaceSVG />}
    </Button>
  );
}

PaginationArrowButton.variants = Variants;
