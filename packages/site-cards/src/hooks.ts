import { KeyboardEvent, MouseEvent, MouseEventHandler, useRef } from 'react';

import { noop } from './components/utils';
import { TRIGGER_CLICK_KEY_CODES } from './constants';

type useCardInteractionsProps = {
  href?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function useCardInteractions({ href, disabled, onClick }: useCardInteractionsProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
  };

  const handleCardClick = disabled || !href ? undefined : noop;

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (TRIGGER_CLICK_KEY_CODES.includes(e.key)) {
      anchorRef?.current?.click();
    }
  };

  return {
    anchorRef,
    handleLinkClick,
    handleCardClick,
    handleCardKeyDown,
  };
}
