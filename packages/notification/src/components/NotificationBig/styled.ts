import { styled } from '@linaria/react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { H5_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from '../themes';
import { NotificationBigStatus, NotificationBigVariant } from './constants';

PURPLE_THEME;
PURPLE_DARK_THEME;
GREEN_THEME;
GREEN_DARK_THEME;

export const Container = styled.div`
  display: flex;
  border: 1px solid;
  padding: 11px 27px 11px 11px;
  border-radius: 8px;
  position: relative;
  cursor: default;
  box-sizing: border-box;

  &[data-has-one-action] {
    cursor: pointer;
  }

  &[data-has-only-title] {
    align-items: center;
  }

  &[data-variant='${NotificationBigVariant.Info}'] {
    background-color: var(${COLORS.container.background.info});
    border-color: var(${COLORS.container.border.info});
  }

  &[data-variant='${NotificationBigVariant.Alarm}'] {
    background-color: var(${COLORS.container.background.alarm});
    border-color: var(${COLORS.container.border.alarm});
  }
`;

export const CloseButton = styled(ButtonIcon)`
  position: absolute;
  top: 4px;
  right: 4px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 40px;
  height: 40px;

  margin-right: 12px;
  border-radius: 8px;

  &[data-status='${NotificationBigStatus.Info}'] {
    background-color: var(${COLORS.icon.info.background});
  }

  &[data-status='${NotificationBigStatus.Success}'] {
    background-color: var(${COLORS.icon.success.background});
  }

  &[data-status='${NotificationBigStatus.Warning}'] {
    background-color: var(${COLORS.icon.warning.background});
  }

  &[data-status='${NotificationBigStatus.WarningCritical}'] {
    background-color: var(${COLORS.icon.warningCritical.background});
  }

  &[data-status='${NotificationBigStatus.WarningAlarm}'] {
    background-color: var(${COLORS.icon.warningAlarm.background});
  }

  &[data-status='${NotificationBigStatus.Error}'] {
    background-color: var(${COLORS.icon.error.background});
  }

  &[data-status='${NotificationBigStatus.ErrorAlarm}'] {
    background-color: var(${COLORS.icon.errorAlarm.background});
  }
`;

export const Content = styled.div`
  word-break: break-word;
`;

export const Title = styled.h5`
  ${H5_STYLES};

  &[data-variant='${NotificationBigVariant.Info}'] {
    color: var(${COLORS.title.info});
  }

  &[data-variant='${NotificationBigVariant.Alarm}'] {
    color: var(${COLORS.title.alarm});
  }
`;

export const Description = styled.span`
  ${TEXT_3_STYLES};
  display: block;
  margin-top: 4px;
  color: var(${COLORS.description});
`;

export const ActionsContainer = styled.div`
  margin-top: 8px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-column-gap: 12px;
`;
