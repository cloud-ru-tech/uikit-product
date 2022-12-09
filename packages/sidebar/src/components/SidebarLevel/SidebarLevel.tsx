import { ReactNode, useEffect } from 'react';
import useTransition from 'react-transition-state';

import { useSidebarContext } from '../../contexts';
import { TRANSITION_TIMING } from '../Sidebar/constants';
import { TransitionDirection } from './constants';
import * as S from './styled';

type SidebarLevelProps = {
  index: number;
  children: ReactNode;
  hasTitle: boolean;
};

export function SidebarLevel({ index, children, hasTitle }: SidebarLevelProps) {
  const { currentLevel, previousLevel } = useSidebarContext();
  const isVisible = index === currentLevel;
  const [state, toggle] = useTransition({
    mountOnEnter: true,
    unmountOnExit: true,
    initialEntered: isVisible,
    timeout: {
      enter: TRANSITION_TIMING.levelSlideIn,
      exit: TRANSITION_TIMING.levelSlideOut,
    },
  });

  useEffect(() => toggle(isVisible), [isVisible]);

  if (!state.isMounted) {
    return null;
  }

  return (
    <S.Wrapper
      data-transition-status={state.status}
      data-transition-direction={
        previousLevel > currentLevel ? TransitionDirection.Forward : TransitionDirection.Backward
      }
      data-has-title={hasTitle || undefined}
      data-test-id={isVisible ? 'sidebar__level' : undefined}
    >
      {children}
    </S.Wrapper>
  );
}
