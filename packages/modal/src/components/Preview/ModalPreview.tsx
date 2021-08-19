import { cx } from '@linaria/core';
import { useEffect } from 'react';
import RCModal from 'react-modal';

import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';
import { CloseInterfaceSVG } from '@sbercloud/uikit-react-icons';

import {
  Content,
  Title,
  TitleRow,
  modalClassName,
  overlayClassName,
  overlayParentClassname,
  previewCloseButton,
} from './styled';

interface IReactModalProps extends ReactModal.Props {
  isOpen: boolean;
  portalClassName?: string;
  bodyOpenClassName?: string | null;
  htmlOpenClassName?: string | null;
  className?: string;
  onAfterClose?(): void;
  overlayClassName?: string;
  appElement?: HTMLElement | Record<string, unknown>;
  onRequestClose?(event: React.MouseEvent | React.KeyboardEvent): void;
  closeTimeoutMS?: number;
  ariaHideApp?: boolean;
  shouldFocusAfterRender?: boolean;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
  shouldReturnFocusAfterClose?: boolean;
  parentSelector?(): HTMLElement;
  role?: string | null;
  contentLabel?: string;
  contentRef?: (instance: HTMLDivElement) => void;
  overlayRef?: (instance: HTMLDivElement) => void;
  testId?: string;
  id?: string;
}

export interface ModalPreviewProps extends IReactModalProps {
  isOpen: boolean;
  title?: React.ReactNode;
  content?: React.ReactNode;
  contentClassName?: string;
  additionalActions?: React.ReactNode;
}

export const ModalPreview: React.FC<ModalPreviewProps> = props => {
  const {
    title,
    content,
    appElement,
    parentSelector,
    onRequestClose,
    additionalActions,
    className: propsClassName,
    overlayClassName: propsOverlayClassName,
    contentClassName: propsContentClassName,
  } = props;

  useEffect(() => {
    RCModal.setAppElement(appElement as HTMLElement);
  }, [appElement]);

  return (
    <RCModal
      {...props}
      overlayClassName={cx(overlayClassName, Boolean(parentSelector) && overlayParentClassname, propsOverlayClassName)}
      className={cx(modalClassName, propsClassName)}
    >
      <ButtonIcon icon={CloseInterfaceSVG} onClick={onRequestClose} className={previewCloseButton} />
      {title && (
        <>
          <TitleRow>
            {typeof title === 'string' ? <Title>{title}</Title> : title}
            {additionalActions}
          </TitleRow>
          <Divider />
        </>
      )}
      {content && <Content className={propsContentClassName}>{content}</Content>}
    </RCModal>
  );
};
