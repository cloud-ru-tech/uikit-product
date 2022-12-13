import { useSidebarContext } from '../../contexts';
import { SidebarLevel as SidebarLevelProps } from '../../types';
import { Level } from '../Level';
import { List } from '../List';
import { ListHeader } from '../ListHeader';

type SidebarMainProps = {
  level: SidebarLevelProps;
};

export function Content({ level }: SidebarMainProps) {
  const { currentLevel } = useSidebarContext();

  return (
    <>
      <Level isVisible={currentLevel === level} hasTitle={Boolean(level.title)}>
        {level.depth > 0 && <ListHeader level={level} levelIndex={level.depth} />}
        <List level={level} />
      </Level>

      {level.children.map(levelInner => (
        <Content level={levelInner} key={levelInner.title?.id} />
      ))}
    </>
  );
}
