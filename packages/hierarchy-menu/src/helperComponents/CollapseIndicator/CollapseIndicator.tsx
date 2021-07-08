import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-react-icons';

import * as S from './styled';

export function CollapseIndicator({ onClick, collapsed }: { onClick(e: React.MouseEvent): void; collapsed: boolean }) {
  return collapsed ? (
    <DropdownDownInterfaceSVG onClick={onClick} className={S.RotatedView} />
  ) : (
    <DropdownDownInterfaceSVG onClick={onClick} />
  );
}
