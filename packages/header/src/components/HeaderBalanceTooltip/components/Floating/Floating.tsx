import { ReactNode, useState } from 'react';

import * as S from './styled';

export type FloatingProps = {
  active: boolean;
  children: ReactNode;
};

export function Floating({ active, children }: FloatingProps) {
  const [contentWidth, setContentWidth] = useState<string | number>('auto');

  function setContent(content: HTMLElement | null) {
    if (content !== null) {
      setContentWidth(content.getBoundingClientRect().width);
    }
  }

  return (
    <S.Wrapper>
      <S.Content ref={active ? undefined : setContent} data-active={active || undefined}>
        {children}
      </S.Content>
      {active && <S.Fallback width={contentWidth} />}
    </S.Wrapper>
  );
}
