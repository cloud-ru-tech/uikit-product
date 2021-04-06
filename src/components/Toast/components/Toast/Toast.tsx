import React, { ReactNode } from 'react';

import {
  toast as rcToast,
  ToastContainer as RCToastContainer,
  ToastContainerProps,
  ToastContentProps,
  ToastOptions,
} from 'react-toastify';

import { CheckSVG, SmileSadSVG, LoadingSVG, CloseSVG } from '@sbercloud/icons';

import {
  Wrapper,
  StyledIcon,
  Content,
  Title,
  Subtitle,
  Text,
  Actions,
  Action,
  toastClassName,
  toastContainerClassName,
  toastBodyClassName,
  ActionText,
  Close,
  progressClassName,
} from './styled';

import 'react-toastify/dist/ReactToastify.css';

export const VARIANT = {
  INFO: 'info',
  ERROR: 'error',
} as const;

export interface ToastAction {
  title: string;
  onClick: () => void;
}

export interface ToastProps extends Partial<ToastContentProps> {
  className?: string;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  text?: string;
  variant?: typeof VARIANT[keyof typeof VARIANT];
  actions?: ToastAction[];
  closeButton?: boolean;
  progress?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  className,
  icon: Icon,
  title,
  subtitle,
  text,
  variant = VARIANT.INFO,
  progress,
  actions,
  closeButton,
  closeToast,
}) => (
  <Wrapper className={className} data-variant={variant}>
    {closeButton && (
      <Close onClick={closeToast}>
        <CloseSVG size={16} />
      </Close>
    )}

    <StyledIcon>
      {variant === VARIANT.INFO && !progress && <CheckSVG size={24} />}
      {variant === VARIANT.INFO && progress && (
        <LoadingSVG className={progressClassName} size={24} />
      )}
      {variant === VARIANT.ERROR && <SmileSadSVG size={24} />}
      {Icon ?? null}
    </StyledIcon>

    <Content>
      <Title>{title}</Title>

      {subtitle && <Subtitle title={subtitle}>{subtitle}</Subtitle>}

      {text && <Text title={text}>{text}</Text>}

      {Array.isArray(actions) && (
        <Actions>
          {actions.map(({ title, onClick }) => (
            <Action key={title} onClick={onClick}>
              <ActionText>{title}</ActionText>
            </Action>
          ))}
        </Actions>
      )}
    </Content>
  </Wrapper>
);

export const ToastContainer: React.FC<ToastContainerProps> = props => (
  <RCToastContainer
    hideProgressBar
    autoClose={8000}
    closeButton={false}
    closeOnClick={false}
    draggable={false}
    pauseOnHover
    pauseOnFocusLoss
    className={toastContainerClassName}
    toastClassName={toastClassName}
    bodyClassName={toastBodyClassName}
    {...props}
  />
);

export const toast = (
  toastProps: ToastProps,
  options: ToastOptions = {},
): void => {
  rcToast(<Toast {...toastProps} />, options);
};
