import React from 'react';
import RCModal from 'react-modal';
import { CancelSVG } from '@aicloud/ui-icons';

import { Button } from 'components/Button';

import { Divider } from 'components/Divider';
import { previewCloseBtn, Title, Content } from './styled';

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

export interface IModalPreviewProps extends IReactModalProps {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  contentClassName?: string;
}

const customStyles = {
  overlay: {
    zIndex: 99999,
    backgroundColor: 'rgba(52, 63, 72, 0.2)',
    top: 44,
  },
  content: {
    top: 24,
    left: 26,
    right: 26,
    bottom: 24,
    background: '#EDEDED',
    padding: 0,
    border: 0,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
};

export const ModalPreview: React.FC<IModalPreviewProps> = props => {
  const {
    onRequestClose,
    title,
    appElement,
    content,
    contentClassName,
  } = props;

  if (appElement) RCModal.setAppElement(appElement as HTMLElement);
  return (
    <RCModal {...props} style={customStyles}>
      <Button
        type='transparent'
        onClick={onRequestClose}
        className={previewCloseBtn}
      >
        <CancelSVG />
      </Button>
      {title && (
        <>
          <Title>{title}</Title>
          <Divider color='#D2D2D2' style={{ width: '100%', margin: 0 }} />
        </>
      )}
      {content && <Content className={contentClassName}>{content}</Content>}
    </RCModal>
  );
};
