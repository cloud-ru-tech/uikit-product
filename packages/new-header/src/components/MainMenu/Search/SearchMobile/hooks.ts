import { useEffect, useRef, useState } from 'react';
import useTransition from 'react-transition-state';

import { SEARCH_TRANSITION_TIMEOUT } from './constants';

export function useSearchAnimation() {
  const searchRef = useRef<HTMLInputElement>(null);

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const searchInputTabIndex = isSearchActive ? undefined : -1;

  const [animationState, toggle] = useTransition({
    mountOnEnter: true,
    unmountOnExit: true,
    initialEntered: isSearchActive,
    timeout: SEARCH_TRANSITION_TIMEOUT,
  });

  useEffect(() => toggle(isSearchActive), [isSearchActive]);

  const toggleSearchActive = () => setIsSearchActive(prevState => !prevState);

  useEffect(() => {
    if (isSearchActive) {
      searchRef.current?.focus();
    }

    return () => {
      if (isSearchActive) {
        setIsSearchActive(false);
      }
    };
  }, [isSearchActive]);

  return {
    searchRef,
    toggleSearchActive,
    isSearchActive,
    animationState,
    searchInputTabIndex,
  };
}
