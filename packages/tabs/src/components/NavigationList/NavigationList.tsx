import { ReactElement, useContext, useRef } from 'react';

import { WithSupportProps } from '@sbercloud/uikit-utils';

import { TabContext } from '../../helpers/context';
import { Highlighter } from '../Highlighter';
import { NavigationItemProps } from '../NavigationItem';
import * as S from './styled';

export type NavigationListProps = WithSupportProps<{
  children: ReactElement<NavigationItemProps>[];
  className?: string;
}>;

export function NavigationList({ children, className, ...rest }: NavigationListProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const context = useContext(TabContext);
  return (
    <S.RelContainer className={className} {...rest}>
      <S.GroupStyled ref={containerRef} data-size={context.size} data-test-id={'tabs__navigation-list'}>
        {children}
      </S.GroupStyled>
      {containerRef?.current && context.selectedTabRef?.current && (
        <Highlighter container={containerRef.current} selectedTab={context.selectedTabRef.current} />
      )}
    </S.RelContainer>
  );
}
