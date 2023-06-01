import { css } from '@linaria/core';

import { PADDING } from '../ToolbarButton';
import { ICON_SIZE } from './constants';

/**
 * Комопнент использует анимацию из RefreshButton (см. rotateOnClickClassName).
 *
 * Чтобы триггер анимации срабатывал при клике на всю облаcть кнопки –
 * сбрасываем padding и увеличиваем размер.
 *
 * @see https://jira.sbercloud.tech/browse/DPS-4246
 */
export const unpaddingButtonClassName = css`
  && > button {
    padding: 0px;
    width: ${PADDING * 2 + ICON_SIZE}px;
  }
`;

/**
 * В console.dev применяется border-box. Приводит к некорректному отображению.
 */
export const sizedIconClassName = css`
  box-sizing: content-box;
`;
