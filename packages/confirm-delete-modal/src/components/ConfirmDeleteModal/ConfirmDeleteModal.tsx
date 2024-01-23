import { useLanguage } from '@sbercloud/uikit-product-utils';
import { FieldText } from '@snack-uikit/fields';
import { Modal, ModalProps } from '@snack-uikit/modal';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { CopyButton } from '../../helperComponents';
import { DictionaryPropertyAsFn, textProvider, Texts } from '../../helpers';
import { useTextFieldValidation } from './hooks';
import styles from './styles.module.scss';

export type ConfirmDeleteModalProps = Pick<ModalProps, 'open' | 'title' | 'onClose'> & {
  target: {
    type: string;
    name: string;
  };
  onApprove(): void;
};

export function ConfirmDeleteModal({ target, onApprove, onClose, ...restProps }: ConfirmDeleteModalProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const { value, onChange, reset, handleSubmit, error, ref } = useTextFieldValidation(target.name);

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
      subtitle={
        (
          <>
            {textProvider<DictionaryPropertyAsFn>(languageCode, Texts.Sure)(target.type)}
            <TruncateString text={`${target.name}?`} variant={'middle'} hideTooltip />
          </>
        ) as unknown as string
      }
      onClose={handleClose}
      additionalButton={{
        label: textProvider<string>(languageCode, Texts.Cancel),
        onClick: handleCancel,
      }}
      approveButton={{
        appearance: 'destructive',
        label: textProvider<string>(languageCode, Texts.Delete),
        onClick: handleApprove,
      }}
      mode='forced'
      content={
        <>
          <div className={styles.textField}>
            <Typography.SansLabelL className={styles.content}>
              {textProvider<string>(languageCode, Texts.FieldLabel)}
            </Typography.SansLabelL>

            <Typography.SansBodyM tag='h5'>
              <div className={styles.copyValue}>
                <TruncateString text={target.name} variant='middle' />
                <CopyButton valueToCopy={target.name} />
              </div>
            </Typography.SansBodyM>
          </div>

          <FieldText
            ref={ref}
            required
            size='m'
            placeholder={textProvider<string>(languageCode, Texts.EnterName)}
            value={value}
            onChange={onChange}
            hint={error}
            validationState={error ? 'error' : 'default'}
          />
        </>
      }
    />
  );
}
