import { DocumentProps } from '@sbercloud/uikit-product-document';

export const getRemoveButtonProps = (
  { removeButton }: DocumentProps,
  overrideCallback: () => void,
): DocumentProps['removeButton'] => {
  if (!removeButton) {
    return;
  }

  return {
    ...removeButton,
    onClick: overrideCallback,
  };
};
