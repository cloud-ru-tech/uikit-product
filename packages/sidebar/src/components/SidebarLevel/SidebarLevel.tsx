import { ReactNode, useEffect } from 'react';
import useTransition from 'react-transition-state';

import { useSidebarContext } from '../../contexts';
import { TRANSITION_TIMING } from '../Sidebar/constants';
import { TransitionDirection } from './constants';
import * as S from './styled';

type SidebarLevelProps = {
  children: ReactNode;
  hasTitle: boolean;
  isVisible: boolean;
};

export function SidebarLevel({ children, hasTitle, isVisible }: SidebarLevelProps) {
  const { currentLevel, previousLevel } = useSidebarContext();
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
        (previousLevel?.depth ?? 0) > (currentLevel?.depth ?? 0)
          ? TransitionDirection.Forward
          : TransitionDirection.Backward
      }
      data-has-title={hasTitle || undefined}
      data-test-id={isVisible ? 'sidebar__level' : undefined}
    >
      {children}
    </S.Wrapper>
  );
}
