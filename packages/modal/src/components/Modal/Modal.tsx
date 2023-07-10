import { ModalPrivate, Size, Variant } from '@sbercloud/uikit-product-modal-private';
import { extractDataTestProps } from '@sbercloud/uikit-product-utils';

import { Align } from './constants';
import * as S from './styled';
import { ModalProps } from './types';
import { getAlignProps } from './utils';

export function Modal(props: ModalProps) {
  const {
    onClose,
    isOpen,
    isLoading,
    className,
    content,
    disableScroll,
    title,
    subtitle,
    titleTooltip,
    approveButton,
    additionalButton,
    cancelButton,
    size,
    variant,
    align = Align.Sided,
    ...rest
  } = props;

  const { headerAlign, footerAlign } = getAlignProps(align);

  return (
    <ModalPrivate.Container
      isOpen={isOpen}
      hideCross={variant === Variant.Aggressive && props.hideCross}
      className={className}
      size={size}
      onClose={onClose}
      variant={variant}
      {...extractDataTestProps(rest)}
    >
      <ModalPrivate.Header title={title} subtitle={subtitle} titleTooltip={titleTooltip} align={headerAlign} />

      {isLoading ? (
        <ModalPrivate.Content content={<S.StyledSpinner data-test-id='modal__spinner' />} />
      ) : (
        <>
          {content && <ModalPrivate.Content content={content} disableScroll={disableScroll} />}

          <ModalPrivate.Footer
            approveButton={approveButton}
            cancelButton={cancelButton}
            additionalButton={additionalButton}
            align={footerAlign}
          />
        </>
      )}
    </ModalPrivate.Container>
  );
}

Modal.sizes = Size;
Modal.aligns = Align;
Modal.variants = Variant;
