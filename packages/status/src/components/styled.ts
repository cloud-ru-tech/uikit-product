import { styled } from '@linaria/react';

import { EXPORT_VARS } from '@sbercloud/uikit-theme';
import { TableText } from '@sbercloud/uikit-typography';

const { COLORS_STATUS } = EXPORT_VARS;

export const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 100%;

  margin-right: 8px;
  background-color: ${props => props.color || COLORS_STATUS.SUCCESS_BG};

  &[data-type='failed'] {
    background-color: var(${COLORS_STATUS.FAILED_BG});
  }

  &[data-type='success'] {
    background-color: var(${COLORS_STATUS.SUCCESS_BG});
  }

  &[data-type='warning'] {
    background-color: var(${COLORS_STATUS.WARNING_BG});
  }

  &[data-type='unactive'] {
    background-color: var(${COLORS_STATUS.UNACTIVE_BG});
  }
`;

export const Content = styled(TableText)`
  color: var(${COLORS_STATUS.COLOR});
`;
