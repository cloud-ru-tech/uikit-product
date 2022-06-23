import React, { useEffect, useState } from 'react';

import { TreeMenu } from '../helperComponents/TreeMenu';
import { TreeNodeProps } from '../helperComponents/TreeNode';
import * as S from './styled';

export type HierarchyMenuProps = {
  nodes: TreeNodeProps[];
  className?: string;
  onItemClick?(id: string): void;
  activeNode?: string;
  addDivider?: boolean;
  ['data-test-id']?: string;
};

export function HierarchyMenu(props: HierarchyMenuProps) {
  const { nodes = [], className, activeNode, onItemClick, addDivider = true } = props;
  const [activeKey, setActiveKey] = useState(activeNode || '');
  useEffect(() => setActiveKey(activeNode || ''), [activeNode]);

  return (
    <S.Wrapper className={className} data-test-id={props['data-test-id']}>
      {nodes.map(nodeDefinition => (
        <TreeMenu
          {...nodeDefinition}
          key={nodeDefinition.id}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          onItemClick={onItemClick}
          addDivider={addDivider}
        />
      ))}
    </S.Wrapper>
  );
}
