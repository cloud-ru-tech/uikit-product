import { Status, StatusProps } from '@sbercloud/uikit-react-status';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-react-tooltip';
import { FC } from 'react';

import { TableBasicTypes } from '../../../helpers/types';

export const StatusCell: FC<TableBasicTypes.ICellRendererParams & StatusProps & Partial<TooltipProps>> = ({
  value,
  type,
  tooltip,
}) => {
  if (tooltip) {
    return (
      <Tooltip tooltip={tooltip} delayHide={0} delayShow={0} placement={Tooltip.placements.Top}>
        <Status type={type}>{value}</Status>
      </Tooltip>
    );
  }

  return <Status type={type}>{value}</Status>;
};
