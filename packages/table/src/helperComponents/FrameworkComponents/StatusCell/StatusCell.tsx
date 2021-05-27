import { FC } from 'react';

import { Status, StatusProps } from '@sbercloud/uikit-react-status';
import { BasicTooltip, IBasicTooltipProps } from '@sbercloud/uikit-react-tooltip';

import { TableBasicTypes } from '../../../helpers/types';

export const StatusCell: FC<TableBasicTypes.ICellRendererParams & StatusProps & Partial<IBasicTooltipProps>> = ({
  value,
  type,
  tooltip,
}) => {
  if (tooltip) {
    return (
      <BasicTooltip tooltip={tooltip} delayHide={0} delayShow={0} placement={BasicTooltip.placements.Top}>
        <Status type={type}>{value}</Status>
      </BasicTooltip>
    );
  }

  return <Status type={type}>{value}</Status>;
};
