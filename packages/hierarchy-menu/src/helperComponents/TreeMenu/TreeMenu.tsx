import { Divider } from '@sbercloud/uikit-product-divider';

import { TreeNode, TreeNodeProps } from '../TreeNode';
import * as S from './styled';

type TreeMenu = {
  setActiveKey(x: string): void;
  activeKey: string;
  onItemClick?(id: string): void;
  addDivider: boolean;
};

export function TreeMenu({
  activeKey,
  setActiveKey,
  onItemClick,
  addDivider,
  ...treeNodeProps
}: TreeMenu & TreeNodeProps) {
  return (
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
}
