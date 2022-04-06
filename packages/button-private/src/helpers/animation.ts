import { css } from '@linaria/core';

import { ANIMATIONS } from '@sbercloud/uikit-utils';

export const loadingWheelClassName = css`
  ${ANIMATIONS.LOADING_WHEEL};
`;

export const rotateOnClickClassName = css`
  /* чтобы элемент (иконка) заполнил все пустое пространство вокруг себя
  и анимация возникала бы не только при клике непосредственно на элемент (svg),
  но и при кликах вокруг него */
  padding: calc((100% - 20px) / 2);

  transform: rotate(360deg);
  transition: transform 0.5s;

  &:active {
    transform: rotate(0deg);
    transition-duration: 0s;
  }
`;
