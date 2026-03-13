import { useMemo, useState } from 'react';

import { HorizontalMenuCloseSVG, HorizontalMenuOpenSVG } from '@cloud-ru/uikit-product-icons';
import { useLocale } from '@cloud-ru/uikit-product-locale';
import { ButtonSimple } from '@snack-uikit/button';
import { Tree, TreeNodeId, TreeNodeProps } from '@snack-uikit/tree';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';
import { getExpandedNodes } from './utils';

type MenuProps = {
  menuTitle?: string;
  menuItems: TreeNodeProps[];
  enableShrinkMenuButton?: boolean;
  withDefaultOpenedMenuList?: boolean;
  selected?: TreeNodeId;
  onSelect?: (selectedKey: TreeNodeId | undefined, node: TreeNodeProps) => void;
};

export function Menu({
  menuTitle,
  menuItems,
  enableShrinkMenuButton = true,
  withDefaultOpenedMenuList,
  selected,
  onSelect,
}: MenuProps) {
  const { t } = useLocale('PageLayout');
  const allExpandedNodes = useMemo(() => getExpandedNodes(menuItems), [menuItems]);

  const [expandedNodes, setExpandedNodes] = useState<string[]>(withDefaultOpenedMenuList ? allExpandedNodes : []);

  const isExpanded = expandedNodes.length > 0;

  const handleExpandAll = () => setExpandedNodes(getExpandedNodes(menuItems));
  const handleCollapseAll = () => setExpandedNodes([]);

  const showSubheader = Boolean(menuTitle || enableShrinkMenuButton);

  return (
    <div className={styles.sidebar}>
      {showSubheader && (
        <div className={styles.subheader}>
          <Typography.SansTitleM>{menuTitle}</Typography.SansTitleM>
          {enableShrinkMenuButton && (
            <ButtonSimple
              label={isExpanded ? t('TreeNavigation.collapseAll') : t('TreeNavigation.expandAll')}
              icon={isExpanded ? <HorizontalMenuCloseSVG /> : <HorizontalMenuOpenSVG />}
              onClick={isExpanded ? handleCollapseAll : handleExpandAll}
            />
          )}
        </div>
      )}

      <Tree
        data={menuItems}
        selectionMode='single'
        expandedNodes={expandedNodes}
        onExpand={setExpandedNodes}
        selected={selected}
        onSelect={onSelect}
      />
    </div>
  );
}
