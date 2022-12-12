import { useSidebarContext } from '../../contexts';
import { SidebarLevel } from '../Sidebar/types';
import { SidebarLevel as SidebarLevelUI } from '../SidebarLevel';
import { SidebarList } from '../SidebarList';
import { SidebarListHeader } from '../SidebarListHeader';

type SidebarMainProps = {
  level: SidebarLevel;
};

export function SidebarMain({ level }: SidebarMainProps) {
  const { currentLevel } = useSidebarContext();
  const isLevelVisible = currentLevel === level;

  return (
    <>
      <SidebarLevelUI isVisible={isLevelVisible} hasTitle={Boolean(level.title)}>
        {level.depth > 0 && <SidebarListHeader level={level} levelIndex={level.depth} />}
        <SidebarList level={level} />
      </SidebarLevelUI>

      {level.children.map(levelInner => (
        <SidebarMain level={levelInner} key={levelInner.title?.id} />
      ))}
    </>
  );
}
