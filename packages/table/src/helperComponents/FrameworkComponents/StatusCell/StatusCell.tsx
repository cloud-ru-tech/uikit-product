import { FC } from 'react';

import { StatusProps, StatusTag } from '@sbercloud/uikit-react-status';
import { Tooltip, TooltipProps } from '@sbercloud/uikit-react-tooltip';

import { TableBasicTypes } from '../../../helpers/types';

export const StatusCell: FC<TableBasicTypes.ICellRendererParams & StatusProps & Partial<TooltipProps>> = ({
  value,
  type,
  content,
}) => {
  if (content) {
    return (
      <Tooltip content={content}>
        <StatusTag type={type} text={value} />
      </Tooltip>
    );
  }

  return <StatusTag type={type} text={value} />;
};
