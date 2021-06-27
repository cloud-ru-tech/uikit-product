import { cx } from '@linaria/core';
import { CrossSVG } from '@sbercloud/icons';
import { IconButton } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';
import { useEffect } from 'react';
import RCModal from 'react-modal';

import { Content, Title, contentClassname, overlayClassname, overlayParentClassname, previewCloseBtn } from './styled';

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
  title?: string;
  content?: React.ReactNode;
  contentClassName?: string;
}

export const ModalPreview: React.FC<ModalPreviewProps> = props => {
  const { onRequestClose, title, appElement, content, contentClassName, parentSelector } = props;

  useEffect(() => {
    RCModal.setAppElement(appElement as HTMLElement);
  }, [appElement]);

  return (
    <RCModal
      {...props}
      overlayClassName={cx(overlayClassname, Boolean(parentSelector) && overlayParentClassname)}
      className={contentClassname}
    >
      <IconButton variant={IconButton.variants.Popup} onClick={onRequestClose} className={previewCloseBtn}>
        <CrossSVG />
      </IconButton>
      {title && (
        <>
          <Title>{title}</Title>
          <Divider color='middle' />
        </>
      )}
      {content && <Content className={contentClassName}>{content}</Content>}
    </RCModal>
  );
};
