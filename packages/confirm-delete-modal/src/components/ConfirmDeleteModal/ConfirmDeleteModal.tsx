import { cx } from '@linaria/core';
import { Controller, useForm } from 'react-hook-form';

import { ButtonIcon, CopyButton } from '@sbercloud/uikit-product-button';
import { InputCommon } from '@sbercloud/uikit-product-input';
import { Modal, ModalProps } from '@sbercloud/uikit-product-modal';
import { SubtitleRenderProps } from '@sbercloud/uikit-product-modal-private';
import { TruncateString } from '@sbercloud/uikit-product-truncate-string';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { DictionaryPropertyAsFn, textProvider, Texts } from '../../helpers';
import * as S from './styled';

type Fields = {
  name: string;
};

export type ConfirmDeleteModalProps = Pick<ModalProps, 'isOpen' | 'title' | 'onClose'> & {
  target: {
    type: string;
    name: string;
  };
  onApprove(): void;
};

export function ConfirmDeleteModal({ target, onApprove, onClose, ...restProps }: ConfirmDeleteModalProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });

  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Fields>({
    reValidateMode: 'onSubmit',
  });

  const handleChange = (onChange: (value: string) => void) => (value: string) => {
    onChange(value);
    if (Boolean(errors.name)) {
      clearErrors('name');
    }
  };

  const handleValidate = (value: string) => {
    if (value !== target.name) {
      return textProvider<string>(languageCode, Texts.InvalidName);
    }
  };

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
      subtitle={({ className, ...rest }: SubtitleRenderProps) => (
        <div className={cx(S.subtitleClassName, className)} {...rest}>
          {textProvider<DictionaryPropertyAsFn>(languageCode, Texts.Sure)(target.type)}
          <TruncateString text={`${target.name}?`} variant={TruncateString.variants.Middle} hideTooltip />
        </div>
      )}
      onClose={handleClose}
      cancelButton={{
        text: textProvider<string>(languageCode, Texts.Cancel),
        onClick: handleCancel,
      }}
      approveButton={{
        alarm: true,
        onClick: handleApprove,
        text: textProvider<string>(languageCode, Texts.Delete),
        disabled: Boolean(errors.name),
      }}
      content={
        <>
          <S.TextField>
            {textProvider<string>(languageCode, Texts.FieldLabel)}

            <S.CopyValue>
              <TruncateString
                text={target.name}
                variant={TruncateString.variants.Middle}
                textEntity={TruncateString.textEntities.H5}
              />
              <CopyButton text={target.name} as={ButtonIcon} variant={ButtonIcon.variants.Strong} />
            </S.CopyValue>
          </S.TextField>

          <form onSubmit={handleApprove}>
            <Controller
              control={control}
              name='name'
              rules={{
                required: textProvider<string>(languageCode, Texts.Required),
                validate: handleValidate,
              }}
              render={({ field, fieldState: { error } }) => (
                <InputCommon
                  size={InputCommon.sizes.Large}
                  placeholder={textProvider<string>(languageCode, Texts.EnterName)}
                  value={field.value}
                  onChange={handleChange(field.onChange)}
                  error={error?.message}
                />
              )}
            />
          </form>
        </>
      }
    />
  );
}
