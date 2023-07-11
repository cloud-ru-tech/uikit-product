import { ReactNode } from 'react';

import { FooterProps, ModalPrivate, Size, Variant } from '@sbercloud/uikit-product-modal-private';
import { TooltipProps } from '@sbercloud/uikit-product-tooltip';
import { extractDataTestProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Align } from './constants';
import * as S from './styled';
import { getAlignProps } from './utils';

export type ModalProps = WithSupportProps<{
  onClose(): void;
  isOpen: boolean;
  isLoading?: boolean;
  className?: string;
  content?: ReactNode;
  approveButton?: FooterProps['approveButton'];
  cancelButton?: FooterProps['cancelButton'];
  additionalButton?: FooterProps['additionalButton'];
  size?: Size;
  align?: Align;
  variant?: Variant;
  title: string;
  subtitle?: string;
  titleTooltip?: Pick<TooltipProps, 'title' | 'content' | 'link' | 'icon' | 'iconAction'>;
  /** @warning Use only if available in a Modal with Dropdown, Select, Datepicker, Timepicker. It may be dangerous...
   */
  disableScroll?: boolean;
}>;

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
