import { ReactElement } from 'react';

import { StatusBadge } from '@sbercloud/uikit-product-status';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { textProvider } from '../../helpers';
import { Status } from '../Sidebar/types';
import { BADGE_STATUS_BY_SIDEBAR_STATUS, TEXT_BY_SIDEBAR_STATUS } from './constants';
import * as S from './styled';

export type SidebarItemIconProps = {
  icon: ReactElement;
  active?: boolean;
  disabled?: boolean;
  status?: Status;
};

export function SidebarItemIcon({ icon, status, disabled, active }: SidebarItemIconProps) {
  const { languageCode } = useLanguage();
  const element = (
    <S.Icon
      data-test-id='sidebar__item__icon'
      data-disabled={Boolean(disabled) || undefined}
      data-active={Boolean(active) || undefined}
    >
      {icon}
    </S.Icon>
  );

  if (!status) return element;

  return (
    <Tooltip content={textProvider(languageCode, TEXT_BY_SIDEBAR_STATUS[status])} type={Tooltip.types.Tip}>
      <StatusBadge type={BADGE_STATUS_BY_SIDEBAR_STATUS[status]} icon={element}></StatusBadge>
    </Tooltip>
  );
}
