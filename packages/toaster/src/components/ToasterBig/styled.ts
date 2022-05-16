import { styled } from '@linaria/react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { H5_STYLES, TEXT_3_STYLES } from '@sbercloud/uikit-product-typography';

import { COLORS, GREEN_DARK_THEME, GREEN_THEME, PURPLE_DARK_THEME, PURPLE_THEME } from '../themes';
import { ToasterBigStatus, ToasterBigVariant } from './constants';

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

  &[data-has-one-action] {
    cursor: pointer;
  }

  &[data-has-only-title] {
    align-items: center;
  }

  &[data-variant='${ToasterBigVariant.Info}'] {
    background-color: var(${COLORS.container.background.info});
    border-color: var(${COLORS.container.border.info});
  }

  &[data-variant='${ToasterBigVariant.Alarm}'] {
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

  &[data-status='${ToasterBigStatus.Info}'] {
    background-color: var(${COLORS.icon.info.background});
    fill: var(${COLORS.icon.info.fill});
  }

  &[data-status='${ToasterBigStatus.Success}'] {
    background-color: var(${COLORS.icon.success.background});
    fill: var(${COLORS.icon.success.fill});
  }

  &[data-status='${ToasterBigStatus.Warning}'] {
    background-color: var(${COLORS.icon.warning.background});
    fill: var(${COLORS.icon.warning.fill});
  }

  &[data-status='${ToasterBigStatus.WarningCritical}'] {
    background-color: var(${COLORS.icon.warningCritical.background});
    fill: var(${COLORS.icon.warningCritical.fill});
  }

  &[data-status='${ToasterBigStatus.WarningAlarm}'] {
    background-color: var(${COLORS.icon.warningAlarm.background});
    fill: var(${COLORS.icon.warningAlarm.fill});
  }

  &[data-status='${ToasterBigStatus.Error}'] {
    background-color: var(${COLORS.icon.error.background});
    fill: var(${COLORS.icon.error.fill});
  }

  &[data-status='${ToasterBigStatus.ErrorAlarm}'] {
    background-color: var(${COLORS.icon.errorAlarm.background});
    fill: var(${COLORS.icon.errorAlarm.fill});
  }
`;

export const Content = styled.div`
  overflow: hidden;
  word-wrap: break-word;
`;

export const Title = styled.h5`
  ${H5_STYLES};

  &[data-variant='${ToasterBigVariant.Info}'] {
    color: var(${COLORS.title.info});
  }

  &[data-variant='${ToasterBigVariant.Alarm}'] {
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
