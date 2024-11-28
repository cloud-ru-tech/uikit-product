/* eslint-disable @typescript-eslint/no-non-null-assertion */
import cx from 'clsx';
import { Theme, ToastClassName, TypeOptions } from 'react-toastify';

import { isFn } from '../CustomToast/utiils';

type CustomProgressBarProps = {
  delay: number;
  isRunning: boolean;
  closeToast: () => void;
  type?: TypeOptions;
  theme: Theme;
  hide?: boolean;
  className?: ToastClassName;
  style?: React.CSSProperties;
  controlledProgress?: boolean;
  progress?: number | string;
  rtl?: boolean;
  isIn?: boolean;
};

export function ProgressBar({
  delay,
  isRunning,
  closeToast,
  type = 'default',
  hide,
  className,
  style: userStyle,
  controlledProgress,
  progress,
  rtl,
  isIn,
  theme,
}: CustomProgressBarProps) {
  const isHidden = hide || (controlledProgress && progress === 0);
  const style: React.CSSProperties = {
    ...userStyle,
    animationDuration: `${delay}ms`,
    animationPlayState: isRunning ? 'running' : 'paused',
  };

  if (controlledProgress) style.transform = `scaleX(${progress})`;
  const defaultClassName = cx(
    `Toastify__progress-bar`,
    controlledProgress ? `Toastify__progress-bar--controlled` : `Toastify__progress-bar--animated`,
    `Toastify__progress-bar-theme--${theme}`,
    `Toastify__progress-bar--${type}`,
    {
      [`Toastify__progress-bar--rtl`]: rtl,
    },
  );
  const classNames = isFn(className)
    ? className({
        rtl,
        type,
        defaultClassName,
      })
    : cx(defaultClassName, className);

  // 🧐 controlledProgress is derived from progress
  // so if controlledProgress is set
  // it means that this is also the case for progress
  const animationEvent = {
    [controlledProgress && (progress as number)! >= 1 ? 'onTransitionEnd' : 'onAnimationEnd']:
      controlledProgress && (progress as number)! < 1
        ? null
        : () => {
            isIn && closeToast();
          },
  };

  // TODO: add aria-valuenow, aria-valuemax, aria-valuemin

  return (
    <div className={`Toastify__progress-bar--wrp`} data-hidden={isHidden}>
      <div
        className={`Toastify__progress-bar--bg Toastify__progress-bar-theme--${theme} Toastify__progress-bar--${type}`}
      />
      <div
        role='progressbar'
        aria-hidden={isHidden ? 'true' : 'false'}
        aria-label='notification timer'
        className={classNames}
        style={style}
        {...animationEvent}
      />
    </div>
  );
}
