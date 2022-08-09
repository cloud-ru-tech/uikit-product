import { ReactNode } from 'react';

import * as S from './styled';

export type HeaderProjectSelectorCatalogListItemProps = {
  label: string;
  children: ReactNode;
};

export function HeaderProjectSelectorCatalogListItem({ label, children }: HeaderProjectSelectorCatalogListItemProps) {
  return (
    <S.Wrapper role='presentation'>
      <S.Divider />
      <S.Label data-test-id='header-project-selector__catalog-list-item-label'>{label}</S.Label>
      {children}
    </S.Wrapper>
  );
}
