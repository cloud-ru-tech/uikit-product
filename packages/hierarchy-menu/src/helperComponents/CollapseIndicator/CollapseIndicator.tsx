import { FC } from 'react';

import * as S from './styled';

interface CollapseIndicatorProps {
  onClick(e: React.MouseEvent): void;
  collapsed: boolean;
  isLeaf: boolean;
}
export const CollapseIndicator: FC<CollapseIndicatorProps> = ({ onClick, collapsed, isLeaf }) => {
  if (isLeaf) {
    return null;
  }
  return <S.CollapsedIcon onClick={onClick} data-collapsed={collapsed || undefined} />;
};
