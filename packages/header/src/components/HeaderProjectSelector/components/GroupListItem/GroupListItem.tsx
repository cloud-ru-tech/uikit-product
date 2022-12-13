import { ReactNode } from 'react';

import * as S from './styled';

export type GroupListItemProps = {
  label: string;
  children: ReactNode;
};

export function GroupListItem({ label, children }: GroupListItemProps) {
  return (
    <S.Wrapper role='presentation'>
      <S.Divider />
      <S.Label data-test-id='header-project-selector__group-list-item-label'>{label}</S.Label>
      {children}
    </S.Wrapper>
  );
}
