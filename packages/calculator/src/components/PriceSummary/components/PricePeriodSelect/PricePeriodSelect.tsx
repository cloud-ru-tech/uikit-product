import { useEffect, useRef, useState } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@cloud-ru/uikit-product-icons';
import { AdaptiveDroplist } from '@cloud-ru/uikit-product-mobile-dropdown';
import { ButtonFunction } from '@snack-uikit/button';
import { Tooltip } from '@snack-uikit/tooltip';

import { useCalculatorContext } from '../../../../contexts';
import { PRICE_PERIOD } from '../../../../types/Price';
import { parseKeyToDataTest } from '../../../../utils';

export const PRICE_NAME = {
  [PRICE_PERIOD.Month]: 'В месяц',
  [PRICE_PERIOD.Day]: 'В день',
  [PRICE_PERIOD.Hour]: 'В час',
};

export const PRICE_PERIOD_ITEMS = [
  {
    id: PRICE_PERIOD.Month,
    content: 'В месяц',
  },
  {
    id: PRICE_PERIOD.Day,
    content: 'В день',
  },
  {
    id: PRICE_PERIOD.Hour,
    content: 'В час',
  },
];

export function PricePeriodSelect({ hasPayaGo }: { hasPayaGo: boolean }) {
  const { layoutType, pricePeriod, setPricePeriod } = useCalculatorContext();
  const ref = useRef<HTMLButtonElement>(null);
  const dataTestAttribute = parseKeyToDataTest('price', 'summary-footer-total');

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (hasPayaGo) {
      setPricePeriod(PRICE_PERIOD.Month);
    }

    setOpen(false);
  }, [hasPayaGo, setPricePeriod]);

  return (
    <AdaptiveDroplist
      layoutType={layoutType}
      size='m'
      selection={{
        mode: 'single',
        value: pricePeriod,
        onChange: v => {
          v && setPricePeriod(v);
          setOpen(false);
        },
      }}
      open={hasPayaGo ? false : open}
      onOpenChange={setOpen}
      items={PRICE_PERIOD_ITEMS}
      triggerElemRef={ref}
      data-test-id={dataTestAttribute}
    >
      <Tooltip
        tip='Доступен период только в месяц, т.к. в расчет добавлен сервис с методом тарификации PAYA (Pay As You Allocate). Чтобы изменить период расчета, удалите PAYA-сервис из расчета'
        open={hasPayaGo ? undefined : false}
      >
        <ButtonFunction
          ref={ref}
          onClick={hasPayaGo ? e => e.stopPropagation() : () => setOpen(v => !v)}
          label={PRICE_NAME[pricePeriod]}
          size='m'
          icon={open && !hasPayaGo ? <ChevronUpSVG /> : <ChevronDownSVG />}
          disabled={hasPayaGo}
        />
      </Tooltip>
    </AdaptiveDroplist>
  );
}
