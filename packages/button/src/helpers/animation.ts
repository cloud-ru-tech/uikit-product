import { css } from '@linaria/core';

export const infiniteRotateClassName = css`
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const rotateOnClickClassName = css`
  /* чтобы элемент (иконка) заполнил все пустое пространство вокруг себя
  и анимация возникала бы не только при клике непосредственно на элемент (svg),
  но и при кликах вокруг него */
  padding: calc((100% - 20px) / 2);

  transform: rotate(360deg);
  transition-duration: 0.5s;

  &:active {
    transform: rotate(0deg);
    transition-duration: 0s;
  }
`;
