import { QuestionInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { Tooltip } from '@sbercloud/uikit-react-tooltip';
import { FC } from 'react';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const InfoCell: FC<TableBasicTypes.ICellRendererParams & { tooltipText: string }> = ({ tooltipText }) => (
  <Tooltip tooltip={tooltipText} delayShow={0}>
    <QuestionInterfaceSVG className={S.helpIconClassName} />
  </Tooltip>
);
