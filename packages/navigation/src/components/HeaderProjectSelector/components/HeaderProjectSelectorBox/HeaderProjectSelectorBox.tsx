import { ElementType, forwardRef, HTMLAttributes, ReactNode, Ref, useContext } from 'react';

import { IndentContext } from '../../contexts/IndentContext';
import * as S from './styled';

export type HeaderProjectSelectorBoxProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  toolbar?: ReactNode;
};

export const HeaderProjectSelectorBox = forwardRef<HTMLElement, HeaderProjectSelectorBoxProps>(
  function HeaderProjectSelectorBox({ children, toolbar, ...rest }, ref) {
    const indent = useContext(IndentContext);

    return (
      <S.Wrapper ref={ref as Ref<HTMLDivElement>} {...rest}>
        {Array.from({ length: indent }, (_, index) => (
          <S.Indent key={index} />
        ))}
        {children}
        {toolbar && <S.Toolbar>{toolbar}</S.Toolbar>}
      </S.Wrapper>
    );
  },
);
