import { TreeNodeProps } from '../helperComponents/TreeNode';

export function doesSubtreeContainActiveKey(
  { id, directChildren }: Pick<TreeNodeProps, 'id' | 'directChildren'>,
  activeKey: string,
): boolean {
  let res = false;
  if (id === activeKey) return true;
  if (!activeKey) return false;
  if (directChildren) {
    for (let i = 0; i < directChildren.length && !res; ++i) {
      res ||= doesSubtreeContainActiveKey(directChildren[i], activeKey);
    }
  }
  return res;
}
