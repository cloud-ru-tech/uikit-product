import { forwardRef, KeyboardEvent, useCallback, useRef } from 'react';

import { FieldText, FieldTextProps } from '@snack-uikit/fields';
import { useLayoutEffect, useValueControl } from '@snack-uikit/utils';

import { countDigits, getCaretPosition } from '../InputPhone/utils';
import { formatPassport, normalizePassport } from './utils';

export type InputPassportProps = Omit<FieldTextProps, 'value' | 'onChange' | 'type' | 'inputMode'> & {
  value?: string;
  onChange?(value: string): void;
};

export const InputPassport = forwardRef<HTMLInputElement, InputPassportProps>(
  ({ value: valueProp, onChange: onChangeProp, onKeyDown, ...rest }, ref) => {
    const [value = '', setValue] = useValueControl<string>({
      value: valueProp,
      defaultValue: '',
      onChange: onChangeProp,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);
    const caretRef = useRef<number | null>(null);

    const displayValue = formatPassport(value);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    useLayoutEffect(() => {
      const input = inputRef.current;

      if (caretRef.current === null || !input || document.activeElement !== input) {
        caretRef.current = null;
        return;
      }

      input.setSelectionRange(caretRef.current, caretRef.current);
      caretRef.current = null;
    });

    const applyRawValue = (raw: string, caret: number) => {
      const digitsBeforeCaret = countDigits(raw.slice(0, caret));

      caretRef.current = digitsBeforeCaret > 0 ? getCaretPosition(formatPassport(raw), digitsBeforeCaret) : 0;
      setValue(normalizePassport(raw));
    };

    const handleChange = (raw: string) => {
      applyRawValue(raw, inputRef.current?.selectionStart ?? raw.length);
    };

    // Пробел не хранится в значении: Backspace и Delete на нем удаляют соседнюю цифру
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      const { selectionStart, selectionEnd } = event.currentTarget;

      if (event.defaultPrevented || selectionStart === null || selectionStart !== selectionEnd) {
        return;
      }

      if (event.key === 'Backspace' && selectionStart > 0 && /\D/.test(displayValue[selectionStart - 1])) {
        const digitIndex = displayValue.slice(0, selectionStart).search(/\d\D*$/);

        if (digitIndex >= 0) {
          event.preventDefault();
          applyRawValue(displayValue.slice(0, digitIndex) + displayValue.slice(digitIndex + 1), digitIndex);
        }
      }

      if (event.key === 'Delete' && /\D/.test(displayValue[selectionStart] ?? '')) {
        const offset = displayValue.slice(selectionStart).search(/\d/);

        if (offset > 0) {
          const digitIndex = selectionStart + offset;

          event.preventDefault();
          applyRawValue(displayValue.slice(0, digitIndex) + displayValue.slice(digitIndex + 1), selectionStart);
        }
      }
    };

    return (
      <FieldText
        {...rest}
        ref={setRefs}
        inputMode='numeric'
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  },
);
