import cn from 'classnames';
import { ReactNode } from 'react';

import { FieldStepperProps } from '@snack-uikit/fields';
import { Scroll } from '@snack-uikit/scroll';
import { QuestionTooltip } from '@snack-uikit/tooltip';
import { Typography } from '@snack-uikit/typography';

import { useAdaptive } from '../../../hooks';
import { AnyType, FormValues, Price } from '../../../types';
import { formatNumber, getPrice, getValue, setValue } from '../../../utils';
import { CONTROL } from '../constants';
import { ObjectDecorator } from '../ObjectDecorator';
import { StepperControlUi } from '../StepperControl';
import { BaseDecoratorProps, TooltipPlacement } from '../types';
import { StepperWithAllowedValues } from './helperComponents';
import styles from './styles.module.scss';

type TableRow = {
  label: string;
  labelTooltip?: ReactNode;
  labelTooltipPlacement?: TooltipPlacement;
  accessorKey: string;
  priceAccessorKey?: string;

  allowedValues?: number[];

  uiProps?: Pick<FieldStepperProps, 'step' | 'min' | 'max' | 'disabled' | 'postfix'>;
};

export type TableControl = {
  type: typeof CONTROL.Table;
  defaultValue?: FormValues;
  accessorKey: string;

  decoratorProps?: Pick<BaseDecoratorProps, 'label' | 'labelTooltip' | 'labelTooltipPlacement'>;
  counter?: {
    accessorKey: string;
    label: string;
    uiProps?: Pick<FieldStepperProps, 'step' | 'min' | 'max' | 'disabled' | 'postfix'>;
  };

  rows: TableRow[];

  onChangeFn?: never;
  relateFn?: never;
  watchedControls?: never;
};

export type TableControlUiProps = {
  value?: string;
  onChange?(value?: string): void;
  watchedValues?: FormValues;
  priceList: Record<string, Price>;
} & TableControl;

export function TableControlUi({
  rows,
  counter,
  decoratorProps,
  value: valueProp,
  onChange: onChangeProp,
  priceList,
  accessorKey,
}: TableControlUiProps) {
  const { isMobile } = useAdaptive();

  const onChange = (accessorKey: string) => (newValue: AnyType) => {
    setValue(valueProp, accessorKey, newValue);
    onChangeProp?.(valueProp);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headline} data-mobile={isMobile || undefined}>
        <ObjectDecorator {...decoratorProps} />

        {counter && (
          <div className={styles.counter}>
            <Typography.SansBodyS> {counter.label}</Typography.SansBodyS>
            <StepperControlUi
              value={getValue(valueProp, counter.accessorKey)}
              onChange={onChange(counter.accessorKey)}
              uiProps={{
                min: 1,
                size: 's',
                showHint: false,
                ...counter.uiProps,
              }}
              accessorKey={accessorKey}
              type='stepper'
              decoratorProps={{}}
            />
          </div>
        )}
      </div>

      <div className={styles.table}>
        <Scroll barHideStrategy='never'>
          <div className={cn(styles.row, styles.header)}>
            <div className={styles.cell}>Ресурс</div>
            <div className={styles.cell}>Количество</div>
            <div className={styles.cell}>Стоимость в месяц</div>
          </div>

          {rows.map(({ accessorKey, label, labelTooltip, labelTooltipPlacement, uiProps, allowedValues }) => (
            <div className={styles.row} key={accessorKey}>
              <div className={styles.cell}>
                <span>
                  {label}&nbsp;
                  {labelTooltip && (
                    <span className={styles.tipWrapperInline}>
                      <QuestionTooltip
                        data-pointer
                        tip={labelTooltip}
                        placement={labelTooltipPlacement}
                        size='xs'
                        tabIndex={-1}
                      />
                    </span>
                  )}
                </span>
              </div>
              <div className={styles.cell}>
                {allowedValues ? (
                  <StepperWithAllowedValues
                    value={getValue(valueProp, accessorKey)}
                    onChange={onChange(accessorKey)}
                    allowedValues={allowedValues}
                    {...uiProps}
                  />
                ) : (
                  <StepperControlUi
                    value={getValue(valueProp, accessorKey)}
                    onChange={onChange(accessorKey)}
                    uiProps={{
                      showHint: false,
                      min: 0,
                      size: 's',
                      ...uiProps,
                    }}
                    type='stepper'
                    decoratorProps={{}}
                    accessorKey={accessorKey}
                  />
                )}
              </div>
              <div className={styles.cell}>
                {formatNumber(
                  getPrice({
                    price: getValue(priceList, accessorKey),
                    pricePeriod: 'month',
                  }),
                ) + ' ₽'}
              </div>
            </div>
          ))}
        </Scroll>
      </div>
    </div>
  );
}
