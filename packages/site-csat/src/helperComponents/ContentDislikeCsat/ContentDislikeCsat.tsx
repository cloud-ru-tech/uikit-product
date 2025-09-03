import { useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';
import { FieldTextArea } from '@snack-uikit/fields';
import { Checkbox } from '@snack-uikit/toggles';
import { Size, Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

type ButtonSubmit = {
  size: Size;
  fullWidth?: boolean;
};

type ContentDislikeCsatProps = {
  onSubmit: (textComment: string) => void;
  withCheckBoxAgreement?: boolean;
  loadingButton?: boolean;
  onClickForm?: () => void;
  buttonSubmit?: ButtonSubmit;
};

export function ContentDislikeCsat({
  onSubmit,
  withCheckBoxAgreement,
  loadingButton,
  onClickForm,
  buttonSubmit,
}: ContentDislikeCsatProps) {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [checkAgree, setCheckAgree] = useState(false);

  const handleSubmit = () => {
    onSubmit(textAreaValue);
  };

  return (
    <div className={styles.contentBlock} role='group'>
      <FieldTextArea
        onFocus={onClickForm}
        placeholder='Комментарий'
        className={styles.textArea}
        value={textAreaValue}
        onChange={setTextAreaValue}
        maxLength={1000}
        maxRows={4}
        resizable={true}
      />
      {withCheckBoxAgreement && (
        <div className={styles.checkBoxBlock}>
          <Checkbox checked={checkAgree} onChange={setCheckAgree} />
          <Typography.SansBodyM>
            Я даю{' '}
            <a
              className={styles.link}
              target='_blank'
              href='https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/pd-processing-consent-materials-mailing.pdf'
              rel='noreferrer'
            >
              согласие
            </a>{' '}
            на обработку моих персональных данных и получение рекламных и информационных сообщений в соответствии с
            условиями{' '}
            <a
              className={styles.link}
              target='_blank'
              href='https://cdn.cloud.ru/docs/legal/security/cybersecurity-pd/confidentiality-policy.pdf'
              rel='noreferrer'
            >
              политики конфиденциальности
            </a>
          </Typography.SansBodyM>
        </div>
      )}
      <ButtonFilled
        fullWidth={buttonSubmit?.fullWidth}
        size={buttonSubmit?.size}
        loading={loadingButton}
        onClick={handleSubmit}
        label='Отправить комментарий'
      />
    </div>
  );
}
