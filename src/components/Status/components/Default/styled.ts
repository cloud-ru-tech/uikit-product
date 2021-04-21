import { styled } from '@linaria/react';

import { COLORS_STATUS } from 'theme/color/vars';
import { TableText } from 'typography/Table';

import { TYPE } from './Status';

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

  &[data-type='${TYPE.FAILED}'] {
    background-color: var(${COLORS_STATUS.FAILED_BG});
  }

  &[data-type='${TYPE.SUCCESS}'] {
    background-color: var(${COLORS_STATUS.SUCCESS_BG});
  }

  &[data-type='${TYPE.WARNING}'] {
    background-color: var(${COLORS_STATUS.WARNING_BG});
  }

  &[data-type='${TYPE.UNACTIVE}'] {
    background-color: var(${COLORS_STATUS.UNACTIVE_BG});
  }
`;

export const Content = styled(TableText)`
  color: var(${COLORS_STATUS.COLOR});
`;
