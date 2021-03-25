import RCModal from 'react-modal';

import { CancelSVG } from '@aicloud/ui-icons';

import { Button } from 'components/Button';
import { Divider } from 'components/Divider';

import {
  Title,
  Content,
  previewCloseBtn,
  contentClassname,
  overlayClassname,
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

export interface IModalPreviewProps extends IReactModalProps {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  contentClassName?: string;
}

export const ModalPreview: React.FC<IModalPreviewProps> = props => {
  const {
    onRequestClose,
    title,
    appElement,
    content,
    contentClassName,
  } = props;

  if (appElement) {
    RCModal.setAppElement(appElement as HTMLElement);
  }

  return (
    <RCModal
      {...props}
      overlayClassName={overlayClassname}
      className={`${contentClassname} ${contentClassName}`}
    >
      <Button
        variant='transparent'
        onClick={onRequestClose}
        className={previewCloseBtn}
      >
        <CancelSVG />
      </Button>
      {title && (
        <>
          <Title>{title}</Title>
          <Divider />
        </>
      )}
      {content && <Content className={contentClassName}>{content}</Content>}
    </RCModal>
  );
};
