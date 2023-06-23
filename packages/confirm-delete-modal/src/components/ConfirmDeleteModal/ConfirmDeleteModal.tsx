import { Controller, useForm } from 'react-hook-form';

import { ButtonIcon, CopyButton } from '@sbercloud/uikit-product-button';
import { InputCommon } from '@sbercloud/uikit-product-input';
import { Modal, ModalProps } from '@sbercloud/uikit-product-modal';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import { DictionaryPropertyAsFn, textProvider, Texts } from '../../helpers';
import * as S from './styled';

type Fields = {
  name: string;
};

export type ConfirmDeleteModalProps = Pick<ModalProps, 'isOpen' | 'title' | 'onClose'> & {
  target: {
    name: string;
    value: string;
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
    if (value !== target.value) {
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
      subtitle={textProvider<DictionaryPropertyAsFn>(languageCode, Texts.Sure)(target.name)}
      onClose={handleClose}
      cancelButton={{
        text: textProvider<string>(languageCode, Texts.Cancel),
        onClick: handleCancel,
      }}
      approveButton={{
        alarm: true,
        onClick: handleApprove,
        disabled: Boolean(errors.name),
      }}
      content={
        <S.Content>
          <S.TextField>
            <span>{textProvider<string>(languageCode, Texts.FieldLabel)}</span>

            <S.CopyValue>
              {target.value}
              <CopyButton text={target.value} as={ButtonIcon} variant={ButtonIcon.variants.Strong} />
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
        </S.Content>
      }
    />
  );
}
