import { ToastContentProps as RtToastContentProps } from 'react-toastify';

import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';

import { NOTIFICATION_SMALL_TEST_IDS } from '../../testIds';
import { ICON_STATUS_TYPE, NotificationSmallStatus } from './constants';
import * as S from './styled';

export type NotificationSmallProps = Partial<RtToastContentProps> & {
  text: string;
  status?: NotificationSmallStatus;
};

export function NotificationSmall({ status = NotificationSmallStatus.Success, text }: NotificationSmallProps) {
  const hasStatusIcon = status !== NotificationSmallStatus.Neutral;

  return (
    <S.Wrapper data-test-id={`${NOTIFICATION_SMALL_TEST_IDS.main}__${status}`}>
      <S.Container data-has-icon={hasStatusIcon || undefined}>
        {hasStatusIcon && (
          <PredefinedIconsPrivate
            icon={ICON_STATUS_TYPE[status]}
            variant={PredefinedIconsPrivate.variants.OnDark}
            className={S.statusIconClassName}
            data-test-id={NOTIFICATION_SMALL_TEST_IDS.icon}
          />
        )}

        <S.Text data-test-id={NOTIFICATION_SMALL_TEST_IDS.text}>{text}</S.Text>
      </S.Container>
    </S.Wrapper>
  );
}

NotificationSmall.statuses = NotificationSmallStatus;
