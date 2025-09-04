import { useMemo } from 'react';

import { SettingsSVG } from '@sbercloud/uikit-product-icons';
import { Avatar } from '@snack-uikit/avatar';
import { BaseItemProps } from '@snack-uikit/list';

import styles from '../styles.module.scss';
import { UserProfileProps } from '../types';

export function useProfileItem({
  fullName = '',
  email = '',
  itemWrapRender,
  onClick,
}: UserProfileProps): BaseItemProps {
  return useMemo(
    () => ({
      content: {
        option: fullName,
        description: email,
        truncate: {
          description: 1,
        },
      },
      onClick,
      beforeContent: <Avatar size='xs' name={fullName} showTwoSymbols />,
      afterContent: (
        <div className={styles.settingIcon}>
          <SettingsSVG />
        </div>
      ),
      itemWrapRender,

      id: 'header__user-menu__button',
      'data-test-id': 'header__user-menu__manage-profile',

      className: styles.userMenuInfoItem,
    }),
    [email, fullName, itemWrapRender, onClick],
  );
}
