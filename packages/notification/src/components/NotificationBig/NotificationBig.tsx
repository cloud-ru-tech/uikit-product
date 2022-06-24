import { MouseEvent, ReactNode } from 'react';
import { ToastContentProps as RtToastContentProps } from 'react-toastify';

import { ButtonGhost, ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { PredefinedIconsPrivate } from '@sbercloud/uikit-product-predefined-icons-private';

import { NOTIFICATION_BIG_TEST_IDS } from '../../testIds';
import { ICONS_BY_STATUS, NotificationBigStatus, NotificationBigVariant, VARIANT_BY_STATUS } from './constants';
import * as S from './styled';

export type NotificationBigAction = {
  text: string;
  onClick(e: MouseEvent<HTMLButtonElement | HTMLDivElement>, close?: () => void): void;
};

export type NotificationBigProps = Partial<RtToastContentProps> & {
  title: ReactNode;
  description?: string;
  status?: NotificationBigStatus;
  actions?: NotificationBigAction[];
  onCloseClick?(e: MouseEvent<HTMLButtonElement>, close?: () => void): void;
};

export function NotificationBig({
  status = NotificationBigStatus.Info,
  onCloseClick,
  title,
  description,
  actions = [],
  closeToast,
}: NotificationBigProps) {
  const isAlarm = [NotificationBigStatus.ErrorAlarm, NotificationBigStatus.WarningAlarm].includes(status);
  const variant = isAlarm ? NotificationBigVariant.Alarm : NotificationBigVariant.Info;
  const actionsLength = actions.length;
  const hasActions = Boolean(actionsLength);
  const hasOneAction = actionsLength === 1;
  const hasOnlyTitle = !description && !hasActions;

  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseClick ? onCloseClick(e, closeToast) : closeToast?.();
  };

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    hasOneAction && actions[0].onClick(e, closeToast);
  };

  const handleActionClick = (onClick: NotificationBigAction['onClick']) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick(e, closeToast);
  };

  const actionButtonVariant = isAlarm ? ButtonGhost.variants.OnAccent : ButtonGhost.variants.OnDark;

  return (
    <S.Container
      data-test-id={`${NOTIFICATION_BIG_TEST_IDS.main}__${status}`}
      data-variant={variant}
      data-has-only-title={hasOnlyTitle || undefined}
      data-has-one-action={hasOneAction || undefined}
      onClick={handleContainerClick}
    >
      <S.CloseButton
        variant={ButtonIcon.variants.OnAccent}
        data-test-id={NOTIFICATION_BIG_TEST_IDS.closeButton}
        icon={<CloseInterfaceSVG size={20} />}
        onClick={handleCloseClick}
      />

      <S.IconContainer data-status={status} data-test-id={NOTIFICATION_BIG_TEST_IDS.icon}>
        <PredefinedIconsPrivate icon={ICONS_BY_STATUS[status]} variant={VARIANT_BY_STATUS[status]} />
      </S.IconContainer>

      <S.Content>
        <S.Title data-variant={variant} data-test-id={NOTIFICATION_BIG_TEST_IDS.title}>
          {title}
        </S.Title>

        {description && (
          <S.Description data-test-id={NOTIFICATION_BIG_TEST_IDS.description}>{description}</S.Description>
        )}

        {hasActions && (
          <S.ActionsContainer>
            {actions.map(({ text, onClick }, idx) => (
              <ButtonGhost
                key={idx}
                text={text}
                onClick={handleActionClick(onClick)}
                variant={actionButtonVariant}
                size={ButtonGhost.sizes.Small}
                data-test-id={`${NOTIFICATION_BIG_TEST_IDS.action}-${idx}`}
              />
            ))}
          </S.ActionsContainer>
        )}
      </S.Content>
    </S.Container>
  );
}

NotificationBig.statuses = NotificationBigStatus;
