import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { LAYOUT_TYPE } from '@cloud-ru/uikit-product-utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldCode, FieldCodeProps, FieldCodeRef, useFieldCodeValidate } from '../src/components';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Console/Fields Predefined/Field Code',
  component: FieldCode,
};

export default meta;

type FieldCodeStoryArgs = FieldCodeProps & {
  storyResendCode: boolean;
  /** Демо: подставлять текст ошибки через `useFieldCodeValidate` по текущему `value` */
  withLiveValidation?: boolean;
  /** Демо: при `codeLength === 6` подставляет `spacing: [2]` (разрыв после индекса 2) */
  withSpacingAfterIndex2?: boolean;
};

const defaultFieldCodeStoryArgs: FieldCodeStoryArgs = {
  codeLength: 6,
  size: 'l',
  disabled: false,
  spacing: undefined,
  storyResendCode: false,
  withLiveValidation: false,
  withSpacingAfterIndex2: false,
  layoutType: 'desktop',
  error: undefined,
};

type FieldCodeTemplateArgs = FieldCodeStoryArgs & {
  secondsToNextResend: number;
  onResend: () => void;
  onChange: (value: string) => void;
};

const Template = (args: FieldCodeTemplateArgs) => {
  const fieldCodeRef = useRef<FieldCodeRef>(null);
  const {
    storyResendCode = false,
    withLiveValidation = false,
    withSpacingAfterIndex2 = false,
    secondsToNextResend,
    onResend,
    onChange,
    error,
    invalidCode,
    codeLength,
    value,
    spacing,
    ...fieldCodeRest
  } = args;

  const validateCode = useFieldCodeValidate({ codeLength });
  const resolvedError = error ?? (withLiveValidation ? validateCode(value) : undefined);
  const resolvedSpacing = withSpacingAfterIndex2 && codeLength === 6 ? [2] : spacing;

  const handleComplete = (completedCode: string) => {
    // eslint-disable-next-line no-console
    console.log('Code completed:', completedCode);
  };

  return (
    <div className={cn(styles.wrapper)} data-size={args.size || 'l'} data-background='light'>
      <FieldCode
        ref={fieldCodeRef}
        {...fieldCodeRest}
        codeLength={codeLength}
        spacing={resolvedSpacing}
        value={value}
        error={resolvedError}
        invalidCode={invalidCode}
        onChange={onChange}
        onComplete={handleComplete}
        resendCode={
          storyResendCode
            ? {
                onResend,
                secondsToNextResend,
                size: args.size,
              }
            : undefined
        }
      />
    </div>
  );
};

export const fieldCode: StoryObj<FieldCodeStoryArgs> = {
  render: function Render(props: FieldCodeStoryArgs) {
    const storyResendCode = props.storyResendCode ?? defaultFieldCodeStoryArgs.storyResendCode ?? false;
    const [value, setValue] = useState(() => props.value ?? defaultFieldCodeStoryArgs.value ?? '');
    const [secondsToNextResend, setSecondsToNextResend] = useState(8);

    useEffect(() => {
      setValue(props.value ?? defaultFieldCodeStoryArgs.value ?? '');
    }, [props.value]);

    useEffect(() => {
      if (storyResendCode) {
        setSecondsToNextResend(8);
      }
    }, [storyResendCode]);

    useEffect(() => {
      if (!storyResendCode || secondsToNextResend <= 0) {
        return undefined;
      }
      const timerId = window.setTimeout(() => {
        setSecondsToNextResend(seconds => seconds - 1);
      }, 1000);
      return () => window.clearTimeout(timerId);
    }, [storyResendCode, secondsToNextResend]);

    const onResend = () => {
      // eslint-disable-next-line no-console
      console.log('Повторная отправка кода');
      setSecondsToNextResend(8);
      setValue('');
    };

    return (
      <Template
        {...defaultFieldCodeStoryArgs}
        {...props}
        value={value}
        onChange={setValue}
        secondsToNextResend={secondsToNextResend}
        onResend={onResend}
      />
    );
  },
  args: {
    ...defaultFieldCodeStoryArgs,
  },
  argTypes: {
    storyResendCode: {
      name: '[Story]: show resend button',
      control: { type: 'boolean' },
      description: 'Показать кнопку повторной отправки кода (демо `resendCode`)',
    },
    codeLength: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Количество цифр в коде',
    },
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
      description: 'Размер компонента',
    },
    spacing: {
      control: { type: 'object' },
      description: 'Позиции, после которых нужно вставить пробел (индексы символов)',
    },
    layoutType: {
      control: { type: 'select' },
      options: Object.values(LAYOUT_TYPE),
      description: 'Тип лейаута',
    },
    withLiveValidation: {
      name: '[Story]: live validation',
      control: { type: 'boolean' },
      description:
        'Подставляет required / minLength через `useFieldCodeValidate` по `value`. Сценарии: пустое значение, неполный код; вместе с `invalidCode` и полным `value` — демо «неверный код».',
    },
    withSpacingAfterIndex2: {
      name: '[Story]: spacing after index 2',
      control: { type: 'boolean' },
      description:
        'При `codeLength === 6` задаёт `spacing: [2]` (визуальный разрыв после третьей ячейки); иначе используется проп `spacing`.',
    },
    showEmptyChars: {
      control: { type: 'boolean' },
      description: 'Подсветка пустых ячеек',
    },
    stretchCells: {
      control: { type: 'boolean' },
      description:
        'Растягивать ячейки на всю доступную ширину (иначе фиксированная ширина: s — 32px, m — 40px, l — 48px)',
    },
    invalidCode: {
      control: { type: 'text' },
      description: 'Текст при неверном коде, если не задан `error`',
    },
    error: {
      control: { type: 'text' },
      description: 'Текст ошибки; имеет приоритет над `invalidCode`',
    },
  },
  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/dAQu73uGcDG3F1crHcvnqW/PDS-3566-FieldCode?node-id=48927-38244&t=VoMgrRMUhjFkJXtl-4',
    },
  },
};
