import { styled } from '@linaria/react';
import { COLORS_GENERAL } from 'theme/color/vars';

export type TNotifyProps = {
  color?: string;
};

export const NotifyText = styled.span<TNotifyProps>`
  color: ${props => props.color || `var(${COLORS_GENERAL.TEXT})`};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 0;
`;
