import RCModal from 'react-modal';

import { CrossSVG } from '@sbercloud/icons';
import { Button } from '@sbercloud/uikit-react-button';
import { Divider } from '@sbercloud/uikit-react-divider';

import { Content, Title, contentClassname, overlayClassname, previewCloseBtn } from './styled';

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
  const { onRequestClose, title, appElement, content, contentClassName } = props;

  if (appElement) {
    RCModal.setAppElement(appElement as HTMLElement);
  }

  return (
    <RCModal {...props} overlayClassName={overlayClassname} className={`${contentClassname} ${contentClassName}`}>
      <Button variant={Button.variants.Transparent} onClick={onRequestClose} className={previewCloseBtn}>
        <CrossSVG />
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
