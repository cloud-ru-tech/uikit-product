import React, { useEffect, useState } from 'react';

import { TreeMenu } from '../helperComponents/TreeMenu';
import { TreeNodeProps } from '../helperComponents/TreeNode';
import * as S from './styled';

export type HierarchyMenuProps = {
  nodes: TreeNodeProps[];
  width?: string | number;
  height?: string | number;
  activeNode?: string;
};

export function HierarchyMenu({ nodes = [], width, height, activeNode }: HierarchyMenuProps) {
  const [activeKey, setActiveKey] = useState(activeNode || '');
  useEffect(() => setActiveKey(activeNode || ''), [activeNode]);
  return (
    <S.Wrapper width={width} height={height}>
      {nodes.map(nodeDefinition => (
        <TreeMenu {...nodeDefinition} key={nodeDefinition.id} activeKey={activeKey} setActiveKey={setActiveKey} />
      ))}
    </S.Wrapper>
  );
}
