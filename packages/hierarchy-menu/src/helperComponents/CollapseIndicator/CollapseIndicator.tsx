import * as S from './styled';

type CollapseIndicatorProps = {
  onClick(e: React.MouseEvent): void;
  collapsed: boolean;
  isLeaf: boolean;
};
export function CollapseIndicator({ onClick, collapsed, isLeaf }: CollapseIndicatorProps) {
  if (isLeaf) {
    return null;
  }
  return <S.CollapsedIcon onClick={onClick} data-collapsed={collapsed || undefined} />;
}
