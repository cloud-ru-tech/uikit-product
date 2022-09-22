import { useSidebarContext } from '../../context';
import { SidebarLevel } from '../SidebarLevel';
import { SidebarList } from '../SidebarList';
import { SidebarListHeader } from '../SidebarListHeader';
import * as S from './styled';

export function SidebarMain() {
  const { levels } = useSidebarContext();

  return (
    <S.Main>
      {levels.map((level, index) => (
        <SidebarLevel key={index} index={index} hasTitle={Boolean(level.title)}>
          {index > 0 && <SidebarListHeader level={level} levelIndex={index} />}
          <SidebarList list={level.list} levelIndex={index} />
        </SidebarLevel>
      ))}
    </S.Main>
  );
}
