import { MouseEvent } from 'react';
import { ToastContentProps as RtToastContentProps } from 'react-toastify';

import { ButtonGhost } from '@sbercloud/uikit-product-button';
import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';

import { NOTIFICATION_SMALL_TEST_IDS } from '../../testIds';
import { ICON_STATUS_TYPE, NotificationSmallStatus } from './constants';
import * as S from './styled';

export type NotificationSmallAction = {
  text: string;
  onClick(e: MouseEvent<HTMLButtonElement | HTMLDivElement>, close: () => void): void;
};

type NotificationSmallCommonProps = Partial<RtToastContentProps> & {
  text: string;
  status?: NotificationSmallStatus;
};

export type NotificationSmallPropsWithAction = NotificationSmallCommonProps & {
  action: NotificationSmallAction;
  closeToast: () => void;
};

export type NotificationSmallProps = NotificationSmallCommonProps | NotificationSmallPropsWithAction;

function ActionButton(props: NotificationSmallProps) {
  if (!('action' in props)) {
    return null;
  }

  const { closeToast, action } = props;

  const handleActionClick = (onClick: NotificationSmallAction['onClick']) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick(e, closeToast);
  };

  return (
    <ButtonGhost
      text={action.text}
      onClick={handleActionClick(action.onClick)}
      variant={ButtonGhost.variants.OnDark}
      size={ButtonGhost.sizes.Medium}
      className={S.actionClassName}
      data-test-id={NOTIFICATION_SMALL_TEST_IDS.action}
    />
  );
}

export function NotificationSmall(props: NotificationSmallProps) {
  const { status = NotificationSmallStatus.Success, text } = props;
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
        <ActionButton {...props} />
      </S.Container>
    </S.Wrapper>
  );
}

NotificationSmall.statuses = NotificationSmallStatus;
