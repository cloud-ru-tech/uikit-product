import { styled } from '@linaria/react';

import { DEPRECATED_EXPORT_VARS } from '@sbercloud/uikit-theme';

const { COLORS_ATTENTION } = DEPRECATED_EXPORT_VARS;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Highlighter = styled.div`
  border-width: 2px;
  border-radius: 4px;
  border-style: solid;

  &[data-importance-level='normal'] {
    border-color: var(${COLORS_ATTENTION.NORMAL_IMPORTANCE_LEVEL_LINE});
    background-color: var(${COLORS_ATTENTION.NORMAL_IMPORTANCE_LEVEL_LINE});
  }

  &[data-importance-level='high'] {
    border-color: var(${COLORS_ATTENTION.HIGH_IMPORTANCE_LEVEL_LINE});
    background-color: var(${COLORS_ATTENTION.HIGH_IMPORTANCE_LEVEL_LINE});
  }
`;

export const Content = styled.div`
  margin-left: 16px;
`;
