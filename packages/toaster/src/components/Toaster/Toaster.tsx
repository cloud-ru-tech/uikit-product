import {
  CircleCheckFilledInterfaceSVG,
  CloseInterfaceSVG,
  LoadingWheelInterfaceSVG,
  Smile2InterfaceSVG,
} from '@sbercloud/uikit-react-icons';
import { ReactNode } from 'react';
import { ToastContentProps } from 'react-toastify';

import {
  Action,
  ActionText,
  Actions,
  Close,
  Content,
  StyledIcon,
  Subtitle,
  Text,
  Title,
  Wrapper,
  progressClassName,
} from './styled';

export enum Variants {
  Info = 'info',
  Error = 'error',
}

export interface ToastAction {
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, closeToast?: () => void) => void;
}

export interface ToasterProps extends Partial<ToastContentProps> {
  className?: string;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  text?: string;
  variant?: Variants;
  actions?: ToastAction[];
  closeButton?: boolean;
  progress?: boolean;
}

export function Toaster({
  className,
  icon: Icon,
  title,
  subtitle,
  text,
  variant = Variants.Info,
  progress,
  actions,
  closeButton,
  closeToast,
}: ToasterProps) {
  return (
    <Wrapper className={className} data-variant={variant}>
      {closeButton && (
        <Close onClick={closeToast}>
          <CloseInterfaceSVG size={16} />
        </Close>
      )}

      <StyledIcon>
        {variant === Variants.Info && !progress && <CircleCheckFilledInterfaceSVG size={24} />}
        {variant === Variants.Info && progress && <LoadingWheelInterfaceSVG className={progressClassName} size={24} />}
        {variant === Variants.Error && <Smile2InterfaceSVG size={24} />}
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
                onClick={(e: any) => {
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
}
