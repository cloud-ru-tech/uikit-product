import { ElementType, forwardRef, HTMLAttributes, ReactNode, Ref } from 'react';

import * as S from './styled';

export type HeaderProjectSelectorBoxProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  toolbar?: ReactNode;
};

export const HeaderProjectSelectorBox = forwardRef<HTMLElement, HeaderProjectSelectorBoxProps>(
  function HeaderProjectSelectorBox({ children, toolbar, ...rest }, ref) {
    return (
      <S.Wrapper ref={ref as Ref<HTMLDivElement>} {...rest}>
        {children}
        {toolbar && <S.Toolbar>{toolbar}</S.Toolbar>}
      </S.Wrapper>
    );
  },
);
