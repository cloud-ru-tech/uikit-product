import { FC } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';

import { TreeNode, TreeNodeProps } from '../TreeNode';
import * as S from './styled';

interface TreeMenu {
  setActiveKey(x: string): void;
  activeKey: string;
  onItemClick?(id: string): void;
  addDivider: boolean;
}

export const TreeMenu: FC<TreeMenu & TreeNodeProps> = ({
  activeKey,
  setActiveKey,
  onItemClick,
  addDivider,
  ...treeNodeProps
}) => (
  <>
    <TreeNode
      {...treeNodeProps}
      key={treeNodeProps.id}
      setActiveKey={setActiveKey}
      activeKey={activeKey}
      onItemClick={onItemClick}
    />

    {addDivider && (
      <S.DividerWrapper>
        <Divider />
      </S.DividerWrapper>
    )}
  </>
);
