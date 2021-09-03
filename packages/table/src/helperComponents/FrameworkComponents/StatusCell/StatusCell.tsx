import { FC } from 'react';

import { StatusProps, StatusTag } from '@sbercloud/uikit-react-status';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-react-tooltip';

import { TableBasicTypes } from '../../../helpers/types';

export const StatusCell: FC<TableBasicTypes.ICellRendererParams & StatusProps & Partial<TooltipProps>> = ({
  value,
  type,
  tooltip,
}) => {
  if (tooltip) {
    return (
      <Tooltip tooltip={tooltip} delayHide={0} delayShow={0} placement={Tooltip.placements.Top}>
        <StatusTag type={type} text={value} />
      </Tooltip>
    );
  }

  return <StatusTag type={type} text={value} />;
};
