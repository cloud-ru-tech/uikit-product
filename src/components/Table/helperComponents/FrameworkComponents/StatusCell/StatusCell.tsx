import { FC } from 'react';

import { Status, IStatusProps } from 'components/Status';
import { BasicTooltip, IBasicTooltipProps } from 'components/Tooltip';
import { TableBasicTypes } from 'components/Table/helpers/types';

export const StatusCell: FC<
  TableBasicTypes.ICellRendererParams &
    IStatusProps &
    Partial<IBasicTooltipProps>
> = ({ value, type, tooltip }) => {
  if (tooltip) {
    return (
      <BasicTooltip tooltip={tooltip}>
        <Status type={type}>{value}</Status>
      </BasicTooltip>
    );
  }

  return <Status type={type}>{value}</Status>;
};
