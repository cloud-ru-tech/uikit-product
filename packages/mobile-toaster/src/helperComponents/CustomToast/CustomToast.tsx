/* eslint-disable jsx-a11y/no-static-element-interactions */
import cx from 'clsx';
import { ReactNode } from 'react';
import {
  DraggableDirection,
  Theme,
  ToastClassName,
  ToastContent,
  ToastOptions,
  ToastPosition,
  ToastTransition,
  TypeOptions,
  useToast,
} from 'react-toastify';

import { ProgressBar } from '../CustomProgressBar';
import { isFn } from './utiils';

type Id = number | string;

type ToastProps = ToastOptions & {
  isIn: boolean;
  staleId?: Id;
  toastId: Id;
  key: Id;
  transition: ToastTransition;
  closeToast: () => void;
  position: ToastPosition;
  children?: ToastContent;
  draggablePercent: number;
  draggableDirection?: DraggableDirection;
  progressClassName?: ToastClassName;
  className?: ToastClassName;
  bodyClassName?: ToastClassName;
  deleteToast: () => void;
  theme: Theme;
  type: TypeOptions;
  collapseAll: () => void;
  stacked?: boolean;
};

export function CustomToast(props: ToastProps) {
  const { isRunning, preventExitTransition, toastRef, eventHandlers, playToast } = useToast(props);

  const { transition: Transition } = props;

  const defaultClassName = cx(
    `Toastify__toast-mobile`,
    `Toastify__toast-theme--${props.theme}`,
    `Toastify__toast--${props.type}`,
    {
      [`Toastify__toast--rtl`]: props.rtl,
    },
    {
      [`Toastify__toast--close-on-click`]: props.closeOnClick,
    },
  );

  const isProgressControlled = Boolean(props.progress) || !props.autoClose;

  const cssClasses = isFn(props.className)
    ? props.className({
        rtl: props.rtl,
        position: props.position,
        type: props.type,
        defaultClassName,
      })
    : cx(defaultClassName, props.className);

  return (
    <Transition
      isIn={props.isIn}
      done={props.deleteToast}
      position={props.position}
      preventExitTransition={preventExitTransition}
      nodeRef={toastRef}
      playToast={playToast}
    >
      <div
        ref={toastRef}
        id={props.toastId as string}
        data-in={props.isIn}
        className={cssClasses}
        style={props.style}
        onClick={props.onClick}
        {...eventHandlers}
      >
        <div
          {...(props.isIn && { role: props.role })}
          className={
            isFn(props.bodyClassName) && props.bodyClassName
              ? props.bodyClassName({ type: props.type })
              : cx(`Toastify__toast-mobile-body`, props.bodyClassName)
          }
          style={props.bodyStyle}
        >
          <div>{props.children as ReactNode}</div>
        </div>
        <ProgressBar
          {...(props.updateId && !isProgressControlled ? { key: `pb-${props.updateId}` } : {})}
          rtl={props.rtl}
          theme={props.theme}
          delay={props.autoClose as number}
          isRunning={isRunning}
          isIn={props.isIn}
          closeToast={props.closeToast}
          hide={props.hideProgressBar}
          type={props.type}
          style={props.progressStyle}
          className={props.progressClassName}
          controlledProgress={isProgressControlled}
          progress={props.progress || 0}
        />
      </div>
    </Transition>
  );
}
