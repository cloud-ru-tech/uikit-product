import cn from 'classnames';

import { Typography } from '@snack-uikit/typography';

import { useCalculatorContext } from '../../contexts';
import { CALCULATOR_TYPE } from '../../types';
import { parseKeyToDataTest } from '../../utils';
import styles from './styles.module.scss';

type DisclaimerProps = {
  className?: string;
};

export function Disclaimer({ className }: DisclaimerProps) {
  const { layoutType, calculatorType } = useCalculatorContext();
  const dataTestAttribute = parseKeyToDataTest('disclaimer');

  return (
    <div
      className={cn(styles.footer, className)}
      data-mobile={layoutType === 'mobile' || undefined}
      data-test-id={dataTestAttribute}
    >
      {calculatorType !== CALCULATOR_TYPE.Partners && (
        <Typography family='sans' purpose='body' size={layoutType === 'mobile' ? 's' : 'm'}>
          Рассчитываемая Калькулятором стоимость является предварительной, основанной на внесенных пользователем данных,
          и не может расцениваться как предложение заключить договор по определенной Калькулятором цене (не является
          офертой).
        </Typography>
      )}
    </div>
  );
}
