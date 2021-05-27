import { FC } from 'react';

import { HelpSVG } from '@sbercloud/icons';
import { BasicTooltip } from '@sbercloud/uikit-react-tooltip';

import { TableBasicTypes } from '../../../helpers/types';
import * as S from './styled';

export const InfoCell: FC<TableBasicTypes.ICellRendererParams & { tooltipText: string }> = ({ tooltipText }) => (
  <BasicTooltip tooltip={tooltipText} delayShow={0}>
    <HelpSVG className={S.helpIconClassName} />
  </BasicTooltip>
);
