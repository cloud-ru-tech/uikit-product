import { MouseEvent, ReactNode } from 'react';
import { ToastContentProps } from 'react-toastify';

import { ButtonGhost, ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { TOASTER_BIG_TEST_IDS } from '../../testIds';
import { ICONS_BY_STATUS, ToasterBigStatus, ToasterBigVariant } from './constants';
import * as S from './styled';

export type ToasterBigAction = {
  text: string;
  onClick(e: MouseEvent<HTMLButtonElement | HTMLDivElement>, close?: () => void): void;
};

export type ToasterBigProps = Partial<ToastContentProps> & {
  title: ReactNode;
  description?: string;
  status?: ToasterBigStatus;
  actions?: ToasterBigAction[];
  onCloseClick?(e: MouseEvent<HTMLButtonElement>, close?: () => void): void;
};

export function ToasterBig({
  status = ToasterBigStatus.Info,
  onCloseClick,
  title,
  description,
  actions = [],
  closeToast,
}: ToasterBigProps) {
  const isAlarm = [ToasterBigStatus.ErrorAlarm, ToasterBigStatus.WarningAlarm].includes(status);
  const variant = isAlarm ? ToasterBigVariant.Alarm : ToasterBigVariant.Info;
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

  const handleActionClick = (onClick: ToasterBigAction['onClick']) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick(e, closeToast);
  };

  const Icon = ICONS_BY_STATUS[status];

  const actionButtonVariant = isAlarm ? ButtonGhost.variants.OnAccent : ButtonGhost.variants.OnDark;

  return (
    <S.Container
      data-test-id={`${TOASTER_BIG_TEST_IDS.main}__${status}`}
      data-variant={variant}
      data-has-only-title={hasOnlyTitle || undefined}
      data-has-one-action={hasOneAction || undefined}
      onClick={handleContainerClick}
    >
      <S.CloseButton
        variant={ButtonIcon.variants.OnAccent}
        data-test-id={TOASTER_BIG_TEST_IDS.closeButton}
        icon={<CloseInterfaceSVG size={20} />}
        onClick={handleCloseClick}
      />

      <S.IconContainer data-status={status} data-test-id={TOASTER_BIG_TEST_IDS.icon}>
        <Icon size={20} />
      </S.IconContainer>

      <S.Content>
        <S.Title data-variant={variant} data-test-id={TOASTER_BIG_TEST_IDS.title}>
          {title}
        </S.Title>

        {description && <S.Description data-test-id={TOASTER_BIG_TEST_IDS.description}>{description}</S.Description>}

        {hasActions && (
          <S.ActionsContainer>
            {actions.map(({ text, onClick }, idx) => (
              <ButtonGhost
                key={idx}
                text={text}
                onClick={handleActionClick(onClick)}
                variant={actionButtonVariant}
                size={ButtonGhost.sizes.Small}
                data-test-id={`${TOASTER_BIG_TEST_IDS.action}-${idx}`}
              />
            ))}
          </S.ActionsContainer>
        )}
      </S.Content>
    </S.Container>
  );
}

ToasterBig.statuses = ToasterBigStatus;
