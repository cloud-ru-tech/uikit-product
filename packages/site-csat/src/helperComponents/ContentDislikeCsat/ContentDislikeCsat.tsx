import cn from 'classnames';
import { useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';
import { ChipToggle } from '@snack-uikit/chips';
import { FieldTextArea } from '@snack-uikit/fields';
import { Checkbox } from '@snack-uikit/toggles';
import { Size, Typography } from '@snack-uikit/typography';

import { onSubmitVariables } from '../../types';
import styles from './styles.module.scss';

type ButtonSubmit = {
  size: Size;
  fullWidth?: boolean;
};

type ContentDislikeCsatProps = {
  onSubmit({ textComment, selectedChips }: onSubmitVariables): void;
  withCheckBoxAgreement?: boolean;
  loadingButton?: boolean;
  onClickForm?: () => void;
  buttonSubmit?: ButtonSubmit;
  classNameContentContainer?: string;
  classNameChipsContainer?: string;
  onCheckChips?(titleChip: string): void;
};

const CHIPS = ['Нет нужного', 'Неудобный поиск', 'Тяжело найти ответ', 'Другое'];

const MAX_COMMENT_LENGTH = 1000;

export function ContentDislikeCsat({
  onSubmit,
  withCheckBoxAgreement,
  loadingButton,
  onClickForm,
  buttonSubmit,
  onCheckChips,
  classNameContentContainer,
  classNameChipsContainer,
}: ContentDislikeCsatProps) {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [checkAgree, setCheckAgree] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  const handleChangeComment = (value: string) => {
    if (value.length <= MAX_COMMENT_LENGTH) {
      setTextAreaValue(value);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      textComment: textAreaValue,
      selectedChips,
    });
  };

  const handleSelectChips = (text: string) => {
    if (selectedChips.find(item => item === text)) {
      setSelectedChips(prev => prev.filter(chip => chip !== text));
    } else {
      setSelectedChips([...selectedChips, text]);
    }
  };

  return (
    <div className={cn(styles.contentBlock, classNameContentContainer)} role='group'>
      <div className={cn(styles.chipsContainer, classNameChipsContainer)}>
        {CHIPS.map(item => (
          <ChipToggle
            key={item}
            label={item}
            size='s'
            onChange={() => {
              onCheckChips && onCheckChips(item);
              handleSelectChips(item);
            }}
            checked={Boolean(selectedChips.find(chip => chip === item))}
          />
        ))}
      </div>
      {selectedChips.length > 0 && (
        <>
          <FieldTextArea
            onFocus={onClickForm}
            placeholder='Комментарий'
            label='Расскажите подробнее'
            className={styles.textArea}
            value={textAreaValue}
            onChange={handleChangeComment}
            maxLength={MAX_COMMENT_LENGTH}
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
            label='Оставить комментарий'
          />
        </>
      )}
    </div>
  );
}
