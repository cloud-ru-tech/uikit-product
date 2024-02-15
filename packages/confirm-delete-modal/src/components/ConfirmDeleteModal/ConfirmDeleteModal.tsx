import { ReactNode } from 'react';

import { useLanguage } from '@sbercloud/uikit-product-utils';
import { Modal, ModalProps } from '@snack-uikit/modal';

import { InputConfirm } from '../../helperComponents';
import { isDefined, textProvider, Texts } from '../../helpers';
import { useTextFieldValidation } from './hooks';

export type ConfirmDeleteModalProps = Pick<ModalProps, 'open' | 'title' | 'titleTooltip' | 'onClose'> & {
  targetName?: string;
  onApprove(): void;
  isDeleting?: boolean;
  subtitle?: ReactNode;
  additionalContent?: React.ReactNode;
};

export function ConfirmDeleteModal({
  targetName,
  additionalContent,
  subtitle,
  isDeleting,
  onApprove,
  onClose,
  ...restProps
}: ConfirmDeleteModalProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const withInputConfirmation = isDefined(targetName);

  const { reset, handleSubmit, ...inputProps } = useTextFieldValidation(targetName);

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleCancel = () => {
    onClose();
    reset();
  };

  const handleApprove = handleSubmit(() => {
    onApprove();
    handleClose();
  });

  return (
    <Modal
      {...restProps}
      subtitle={subtitle as unknown as string}
      onClose={handleClose}
      additionalButton={{
        label: textProvider<string>(languageCode, Texts.Cancel),
        onClick: handleCancel,
      }}
      approveButton={{
        appearance: 'destructive',
        label: textProvider<string>(languageCode, Texts.Delete),
        loading: isDeleting,
        disabled: isDeleting,
        onClick: handleApprove,
        loading,
      }}
      content={
        (additionalContent || withInputConfirmation) && (
          <>
            {additionalContent}
            {withInputConfirmation && <InputConfirm targetName={targetName} {...inputProps} />}
          </>
        )
      }
    />
  );
}
