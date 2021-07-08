import { Divider } from '@sbercloud/uikit-react-divider';

import { TreeNode, TreeNodeProps } from '../TreeNode';
import * as S from './styled';

export function TreeMenu({
  activeKey,
  setActiveKey,
  ...treeNodeProps
}: TreeNodeProps & { setActiveKey(x: string): void; activeKey: string }) {
  return (
    <>
      <TreeNode {...treeNodeProps} key={treeNodeProps.id} setActiveKey={setActiveKey} activeKey={activeKey} />
      <S.DividerWrapper>
        <Divider />
      </S.DividerWrapper>
    </>
  );
}
