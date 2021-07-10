import { styled } from '@linaria/react';
import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_HIERARCHY_MENU } = DEPRECATED_EXPORT_VARS;

export const NodeWrapper = styled.div<{ depth: number }>`
  cursor: pointer;
  width: auto;
  min-width: max-content;
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: ${({ depth }) => `${depth * 24 + 12}px`};
  padding-right: 12px;

  &[data-leaf='true'] {
    color: var(${COLORS_HIERARCHY_MENU.LEAF_NODE_TEXT});
    fill: var(${COLORS_HIERARCHY_MENU.LEAF_NODE_ICON});

    &:hover {
      color: var(${COLORS_HIERARCHY_MENU.LEAF_NODE_HOVER});
      fill: var(${COLORS_HIERARCHY_MENU.LEAF_NODE_HOVER});
    }

    &[data-active] {
      color: var(${COLORS_HIERARCHY_MENU.LEAF_NODE_ACTIVE});
      fill: var(${COLORS_HIERARCHY_MENU.LEAF_NODE_ACTIVE});
    }
  }

  &[data-leaf='false'] {
    fill: var(${COLORS_HIERARCHY_MENU.ACCORDION_NODE_ICON});
    color: var(${COLORS_HIERARCHY_MENU.ACCORDION_NODE_TEXT});

    &:hover {
      color: var(${COLORS_HIERARCHY_MENU.ACCORDION_NODE_HOVER_TEXT});
    }

    &[data-active] {
      color: var(${COLORS_HIERARCHY_MENU.ACCORDION_NODE_ACTIVE_TEXT});
    }
  }
`;

export const Title = styled.span`
  padding-left: 8px;
  user-select: none;
`;
