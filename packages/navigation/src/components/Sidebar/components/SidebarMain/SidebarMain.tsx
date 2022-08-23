import { useSidebarContext } from '../../context';
import { SidebarList } from '../SidebarList';
import { SidebarListHeader } from '../SidebarListHeader';
import * as S from './styled';

export function SidebarMain() {
  const { levels, currentLevel } = useSidebarContext();

  return (
    <S.Main>
      {levels.map((level, index) => {
        const show = levels.length > 1 ? index === currentLevel : undefined;
        const hide = (levels.length > 1 && index < levels.length - 1) || undefined;

        return (
          <S.Level
            key={level.title?.id || index}
            data-has-title={Boolean(level.title) || undefined}
            data-hide={hide}
            data-show={show}
          >
            {index > 0 && <SidebarListHeader level={level} levelIndex={index} />}

            <SidebarList list={level.list} levelIndex={index} />
          </S.Level>
        );
      })}
    </S.Main>
  );
}
