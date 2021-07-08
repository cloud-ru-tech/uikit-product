import { DetalisationInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { doesSubtreeContainActiveKey } from '../../utils/treeUtils';
import { CollapseIndicator } from '../CollapseIndicator';
import * as S from './styled';

export type TreeNodeProps = {
  id: string;
  title: string;
  directChildren?: TreeNodeProps[];
  onNavigateClick(): void;
};

export function TreeNode({
  depth = 0,
  title,
  id,
  directChildren,
  onNavigateClick,
  activeKey,
  setActiveKey,
}: TreeNodeProps & { setActiveKey(x: string): void; activeKey: string; depth?: number }) {
  const [collapsed, setCollapsed] = useState(
    id === activeKey || !doesSubtreeContainActiveKey({ id, directChildren }, activeKey),
  );

  useEffect(() => {
    if (id !== activeKey && doesSubtreeContainActiveKey({ id, directChildren }, activeKey)) {
      setCollapsed(false);
    }
  }, [activeKey, directChildren, id]);

  const collapseClickHandler = useCallback(
    e => {
      e.stopPropagation();
      if (!collapsed && doesSubtreeContainActiveKey({ id, directChildren }, activeKey)) {
        setActiveKey(id);
      }
      setCollapsed(!collapsed);
    },
    [activeKey, collapsed, directChildren, id, setActiveKey],
  );

  const onItemClickHandler = useCallback(() => {
    onNavigateClick?.();
    setActiveKey(id);
  }, [id, onNavigateClick, setActiveKey]);

  const isLeaf = !Boolean(directChildren);

  const subtreeNodes = useMemo(
    () =>
      directChildren?.map(({ title, directChildren, id, onNavigateClick }) => (
        <TreeNode
          id={id}
          key={id}
          title={title}
          depth={depth + 1}
          directChildren={directChildren}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          onNavigateClick={onNavigateClick}
        />
      )),
    [activeKey, depth, directChildren, setActiveKey],
  );

  return (
    <>
      <S.NodeWrapper
        depth={depth}
        onClick={onItemClickHandler}
        onDoubleClick={collapseClickHandler}
        data-leaf={isLeaf}
        data-active={activeKey === id ? true : undefined}
      >
        {isLeaf && <DetalisationInterfaceSVG />}
        {!isLeaf && <CollapseIndicator onClick={collapseClickHandler} collapsed={collapsed} />}
        <S.Title>{title}</S.Title>
      </S.NodeWrapper>
      {!collapsed && subtreeNodes}
    </>
  );
}
