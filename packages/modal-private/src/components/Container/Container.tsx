import { cx } from '@linaria/core';
import RCModal from 'react-modal';

import { OverlayElement } from '../../helperComponents';
import { Size, Variant } from './constants';
import * as S from './styled';
import { ContainerProps } from './types';
import { getClosureProps, getDataTestAttributes } from './utils';

export function Container({
  isOpen,
  className: propsClassName,
  children,
  size = Size.Small,
  variant = Variant.Regular,
  ...rest
}: ContainerProps) {
  const { shouldCloseOnOverlayClick, shouldCloseOnEsc } = getClosureProps(variant);

  const handleOnClose = () => shouldCloseOnOverlayClick && 'onClose' in rest && rest.onClose();

  if (!isOpen) {
    return null;
  }

  return (
    <RCModal
      isOpen={isOpen}
      data={{ ...getDataTestAttributes(rest), size }}
      shouldCloseOnEsc={shouldCloseOnEsc}
      className={cx(S.contentClassname, propsClassName)}
      onRequestClose={handleOnClose}
      appElement={document.body}
      overlayElement={(_, content) => (
        <OverlayElement
          hasBlur={variant === Variant.Aggressive || variant === Variant.Forced}
          content={content}
          onClose={handleOnClose}
        />
      )}
    >
      {children}
    </RCModal>
  );
}

Container.sizes = Size;
Container.variants = Variant;
