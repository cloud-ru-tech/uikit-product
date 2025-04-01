import { useEffect, useRef } from 'react';

import { LAYOUT_TYPE } from '@sbercloud/uikit-product-utils';
import { ButtonFilled } from '@snack-uikit/button';
import { FieldStepper } from '@snack-uikit/fields';
import { IconPredefined } from '@snack-uikit/icon-predefined';
import { Tooltip } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { useCalculatorContext, useProductContext } from '../../contexts';
import { AnyType, CALCULATOR_TYPE, Product } from '../../types';
import { getValue, parseKeyToDataTest, setValue } from '../../utils';
import { HeaderContainer } from '../HeaderContainer';
import { PriceCount } from './components';
import styles from './styles.module.scss';

type ProductPageHeadlineProps = {
  product: Product;
};

export function ProductPageHeadline({ product }: ProductPageHeadlineProps) {
  const { icon, label, enableChangeProductQuantity, productQuantityValues, freeTier, disabledProductQuantity } =
    product;
  const { min: minProductQuantity = 1, max: maxProductQuantity = 99 } = productQuantityValues ?? {};

  const { value: valueProp, onChange: onChangeProp, price } = useProductContext();

  const value = getValue(valueProp, 'productQuantity');

  const onChange = (newValue: AnyType) => {
    setValue(valueProp, 'productQuantity', newValue);
    onChangeProp(valueProp);
  };

  const {
    layoutType,
    pricePeriod,
    calculatorType,
    actions: { onConnectClick },
    selectedProduct,
  } = useCalculatorContext();

  const isPartners = calculatorType === CALCULATOR_TYPE.Partners;
  const isProductType = calculatorType === CALCULATOR_TYPE.Product;
  const isMobile = layoutType !== LAYOUT_TYPE.Desktop && layoutType !== LAYOUT_TYPE.DesktopSmall;
  const hasCounter = enableChangeProductQuantity || freeTier;
  const TitleComponent = isMobile ? Typography.SansTitleL : Typography.SansHeadlineS;
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current && isMobile && !isProductType) {
      headerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedProduct, isMobile, isProductType]);

  function ConnectButton() {
    const dataTestAttribute = parseKeyToDataTest('product', 'connect-button');

    return !isPartners && product.enableConnectToConsole ? (
      <Tooltip
        hoverDelayOpen={600}
        tip='Вы будете перенаправлены в личный кабинет для подключения выбранной конфигурации'
      >
        <ButtonFilled
          fullWidth={isMobile}
          label='Подключить'
          size='m'
          appearance='primary'
          onClick={() => onConnectClick?.(product.id, valueProp)}
          data-test-id={dataTestAttribute}
        />
      </Tooltip>
    ) : null;
  }

  return (
    <HeaderContainer ref={headerRef}>
      <div className={styles.left}>
        <IconPredefined
          icon={icon}
          size={isMobile ? 's' : 'm'}
          decor={false}
          appearance='primary'
          data-test-id={parseKeyToDataTest('product', 'icon')}
        />

        <TitleComponent>
          <TruncateString
            data-test-id={parseKeyToDataTest('product', 'title')}
            variant='end'
            text={label}
            maxLines={2}
          />
        </TitleComponent>
      </div>

      <div className={styles.right} data-mobile={isMobile || undefined}>
        <PriceCount
          price={price}
          pricePeriod={pricePeriod}
          freeTier={freeTier}
          mobile={isMobile}
          partners={isPartners}
          hasCounter={hasCounter}
        />

        {hasCounter && (
          <div
            className={styles.counter}
            data-mobile={isMobile || undefined}
            data-test-id={parseKeyToDataTest('product', 'counter')}
          >
            <FieldStepper
              size='m'
              step={1}
              min={minProductQuantity}
              max={maxProductQuantity}
              value={value}
              onChange={onChange}
              disabled={freeTier || disabledProductQuantity}
              allowMoreThanLimits={false}
            />
          </div>
        )}

        {!isMobile && <ConnectButton />}
      </div>

      {isMobile && <ConnectButton />}
    </HeaderContainer>
  );
}
