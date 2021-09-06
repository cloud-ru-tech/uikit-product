import { FC } from 'react';

import { QuestionInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Tooltip } from '@sbercloud/uikit-react-tooltip';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const InfoCell: FC<TableBasicTypes.ICellRendererParams & { tooltipText: string }> = ({ tooltipText }) => (
  <Tooltip content={tooltipText}>
    <QuestionInterfaceSVG className={S.helpIconClassName} />
  </Tooltip>
);
