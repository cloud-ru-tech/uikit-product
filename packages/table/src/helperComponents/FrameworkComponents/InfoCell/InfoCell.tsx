import { HelpCenterSVG } from '@sbercloud/icons';
import { BasicTooltip } from '@sbercloud/uikit-react-tooltip';
import { FC } from 'react';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const InfoCell: FC<TableBasicTypes.ICellRendererParams & { tooltipText: string }> = ({ tooltipText }) => (
  <BasicTooltip tooltip={tooltipText} delayShow={0}>
    <HelpCenterSVG className={S.helpIconClassName} />
  </BasicTooltip>
);
