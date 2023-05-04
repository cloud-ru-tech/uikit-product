import { MouseEvent as ReactMouseEvent, useCallback, useEffect, useMemo, useState } from 'react';

import { DetalisationInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { doesSubtreeContainActiveKey } from '../../utils/treeUtils';
import { CollapseIndicator } from '../CollapseIndicator';
import * as S from './styled';

export type TreeNodeProps = {
  id: string;
  title: string;
  directChildren?: TreeNodeProps[];
  onNavigateClick?(): void;
  onItemClick?(id: string): void;
};

export function TreeNode({
  depth = 0,
  title,
  id,
  directChildren,
  onNavigateClick,
  activeKey,
  setActiveKey,
  onItemClick,
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
    (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
      if (!collapsed && doesSubtreeContainActiveKey({ id, directChildren }, activeKey)) {
        setActiveKey(id);
      }
      setCollapsed(!collapsed);
    },
    [activeKey, collapsed, directChildren, id, setActiveKey],
  );

  const onItemClickHandler = useCallback(() => {
    onNavigateClick?.() || onItemClick?.(id);
    setActiveKey(id);
    setCollapsed(!collapsed);
  }, [id, onNavigateClick, setActiveKey, setCollapsed, collapsed, onItemClick]);

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
        data-leaf={isLeaf}
        data-active={activeKey === id ? true : undefined}
        data-test-id={id}
      >
        <CollapseIndicator onClick={collapseClickHandler} isLeaf={isLeaf} collapsed={collapsed} />
        {isLeaf && <DetalisationInterfaceSVG />}
        <S.Title>{title}</S.Title>
      </S.NodeWrapper>
      {!collapsed && subtreeNodes}
    </>
  );
}
