import { ElementType, forwardRef, HTMLAttributes, Ref, useContext } from 'react';

import { IndentContext } from '../../contexts/IndentContext';
import * as S from './styled';

export type HeaderProjectSelectorBoxProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

export const HeaderProjectSelectorBox = forwardRef<HTMLElement, HeaderProjectSelectorBoxProps>(
  function HeaderProjectSelectorBox({ children, ...rest }, ref) {
    const indent = useContext(IndentContext);

    return (
      <S.Wrapper ref={ref as Ref<HTMLDivElement>} {...rest}>
        {Array.from({ length: indent }, (_, index) => (
          <S.Indent key={index} />
        ))}
        {children}
      </S.Wrapper>
    );
  },
);
