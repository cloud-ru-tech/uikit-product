import { KeyboardEventHandler, useRef, useState } from 'react';

import { ChevronUpInterfaceSVG } from '@cloud-ru/uikit-product-icons';
import { Divider } from '@snack-uikit/divider';
import { FieldTextArea } from '@snack-uikit/fields';
import { themeVars } from '@snack-uikit/figma-tokens';
import { Typography } from '@snack-uikit/typography';
import { useLayoutEffect } from '@snack-uikit/utils';

import { MESSAGE_MAX_LENGTH, STATIC_LINE_HEIGHT } from '../../constants';
import { FieldSubmitButton } from '../FieldSubmitButton';
import styles from './styles.module.scss';

export type TextFieldWithAccordionMessageProps = {
  /** Существующий комментарий */
  comment?: string;
  /** Плейсхолдер для поля ввода */
  placeholder?: string;
  /** Callback при изменении текста */
  onChange?: (value: string) => void;
  /** Callback при отправке */
  onSubmit?: (value: string) => void;
  /** Максимальная длина сообщения */
  maxLength?: number;
  /** Является ли устройство тач-девайсом */
  isTouchDevice?: boolean;
  /** Показывать ли тултип на кнопке отправки */
  showSubmitTooltip?: boolean;
  /** Текст тултипа для кнопки отправки */
  submitTooltipText?: string;
};

export function TextFieldWithAccordionMessage({
  comment,
  placeholder,
  onChange,
  onSubmit,
  maxLength = MESSAGE_MAX_LENGTH,
  isTouchDevice = false,
  showSubmitTooltip = true,
  submitTooltipText,
}: TextFieldWithAccordionMessageProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState(comment || '');

  const isValid = typeof message === 'string' && message.trim().length > 0;

  useLayoutEffect(() => {
    if (!comment) return;

    setMessage(comment);

    const timeout = setTimeout(() => {
      if (textRef.current) {
        const textHeight = textRef.current.scrollHeight;
        setIsMultiLine(textHeight > STATIC_LINE_HEIGHT * 2 + 5);
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [comment]);

  const handleClickMessage = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChangeMessage = (value: string) => {
    const truncatedValue = value.slice(0, maxLength);
    setMessage(truncatedValue);
    onChange?.(truncatedValue);
  };

  const handleSubmit = () => {
    if (isValid) {
      onSubmit?.(message);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = event => {
    if (event.key === 'Enter' && !event.shiftKey && !isTouchDevice) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {comment && (
        <div className={styles.comment}>
          <Divider />

          <div
            className={styles.container}
            data-clickable={isMultiLine || undefined}
            onClick={isMultiLine ? handleClickMessage : undefined}
            role={isMultiLine ? 'button' : undefined}
          >
            <div
              ref={textRef}
              className={styles.textContainer}
              data-collapsed={(isMultiLine && !isExpanded) || undefined}
            >
              <Typography.LightBodyS className={styles.text}>{message}</Typography.LightBodyS>
            </div>

            {isMultiLine && (
              <ChevronUpInterfaceSVG
                color={themeVars.sys.neutral.textLight}
                className={styles.textIcon}
                data-rotated={!isExpanded || undefined}
                size={20}
              />
            )}
          </div>
        </div>
      )}

      {!comment && (
        <FieldTextArea
          value={message}
          size='m'
          minRows={1}
          maxRows={4}
          placeholder={placeholder}
          onChange={handleChangeMessage}
          onKeyDown={handleKeyDown}
          spellCheck
          footer={
            <div className={styles.actionsFooter}>
              <FieldSubmitButton
                tooltipText={showSubmitTooltip && !isTouchDevice ? submitTooltipText : undefined}
                className={styles.buttonRight}
                data-mobile={isTouchDevice || undefined}
                active={isValid}
                onClick={handleSubmit}
                size={isTouchDevice ? 's' : 'xs'}
              />
            </div>
          }
          showClearButton={false}
        />
      )}
    </>
  );
}
