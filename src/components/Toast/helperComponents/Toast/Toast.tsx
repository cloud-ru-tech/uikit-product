import { ReactNode } from 'react';
import { ToastContentProps } from 'react-toastify';

import {
  CheckFilledSVG,
  SmileSadSVG,
  LoadingSVG,
  CloseSVG,
} from '@sbercloud/icons';

import { VARIANT } from '../../helpers/constants';

import {
  Wrapper,
  StyledIcon,
  Content,
  Title,
  Subtitle,
  Text,
  Actions,
  Action,
  ActionText,
  Close,
  progressClassName,
} from './styled';

export interface ToastAction {
  title: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    closeToast?: () => void,
  ) => void;
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
      {variant === VARIANT.INFO && !progress && <CheckFilledSVG size={24} />}
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
            <Action
              key={title}
              onClick={e => {
                e.stopPropagation();
                onClick(e, closeToast);
              }}
            >
              <ActionText>{title}</ActionText>
            </Action>
          ))}
        </Actions>
      )}
    </Content>
  </Wrapper>
);
