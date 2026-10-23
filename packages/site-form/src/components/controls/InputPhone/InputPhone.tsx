import { forwardRef, KeyboardEvent, useCallback, useRef } from 'react';

import { FieldText, FieldTextProps } from '@snack-uikit/fields';
import { useLayoutEffect, useValueControl } from '@snack-uikit/utils';

import { countDigits, formatPhone, getCaretPosition, normalizePhone, parsePhone } from './utils';

export type InputPhoneProps = Omit<FieldTextProps, 'value' | 'onChange' | 'type' | 'inputMode'> & {
  value?: string;
  onChange?(value: string): void;
};

export const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  ({ value: valueProp, onChange: onChangeProp, onKeyDown, autoComplete = 'tel', ...rest }, ref) => {
    const [value = '', setValue] = useValueControl<string>({
      value: valueProp,
      defaultValue: '',
      onChange: onChangeProp,
    });

    const inputRef = useRef<HTMLInputElement | null>(null);
    const caretRef = useRef<number | null>(null);

    const displayValue = formatPhone(value);

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
      const { shift } = parsePhone(raw);
      const digitsBeforeCaret = countDigits(raw.slice(0, caret));
      const formatted = formatPhone(raw);

      caretRef.current = getCaretPosition(formatted, digitsBeforeCaret > 0 ? digitsBeforeCaret + shift : 0);
      setValue(normalizePhone(raw));
    };

    const handleChange = (raw: string) => {
      applyRawValue(raw, inputRef.current?.selectionStart ?? raw.length);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);

      const { selectionStart, selectionEnd } = event.currentTarget;

      if (event.defaultPrevented || selectionStart === null || selectionStart !== selectionEnd) {
        return;
      }

      if (event.key === 'Backspace' && selectionStart > 0 && /\D/.test(displayValue[selectionStart - 1])) {
        const digitIndex = displayValue.slice(0, selectionStart).search(/\d\D*$/);

        if (digitIndex > 0) {
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
        type='tel'
        inputMode='tel'
        autoComplete={autoComplete}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  },
);
