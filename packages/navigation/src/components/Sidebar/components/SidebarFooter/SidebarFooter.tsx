import { Divider } from '@sbercloud/uikit-product-divider';

import { useSidebarContext } from '../../context';
import { SidebarProps } from '../../Sidebar';
import { SidebarList } from '../SidebarList';
import * as S from './styled';

type SidebarFooterProps = {
  items: SidebarProps['footerItems'];
};

export function SidebarFooter({ items }: SidebarFooterProps) {
  const { isSearchShown } = useSidebarContext();

  if (isSearchShown) return null;

  return (
    <S.Footer>
      {items?.length && (
        <>
          <Divider />

          <SidebarList levelIndex={0} list={[{ items }]} isFooter />
        </>
      )}
    </S.Footer>
  );
}
