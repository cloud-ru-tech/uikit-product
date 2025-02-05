import deepmerge from 'deepmerge';
import { useDeferredValue, useEffect } from 'react';
import useSWR from 'swr';

import { useValueControl } from '@snack-uikit/utils';

import { ProductContext, ProductsState, useCalculatorContext } from '../../contexts';
import { useAdaptive } from '../../hooks';
import { AnyType } from '../../types';
import { getValue, setValue } from '../../utils';
import { CONTROL } from '../Controls';
import { Control } from '../Controls/Control';
import { ProductPageHeadline } from '../ProductHeadline';
import styles from './styles.module.scss';

type ProductPageProps = {
  selectedProduct: { id: string; idx: number };

  className?: string;
};

export function ProductPage({ className, selectedProduct }: ProductPageProps) {
  const { calculatorType, config, products, setProducts, fetcherFn } = useCalculatorContext();

  const { isMobile } = useAdaptive();

  const baseAccessorKey = `${selectedProduct.id}[${selectedProduct.idx}]`;

  const accessorKey = {
    data: `${baseAccessorKey}.data`,
    price: `${baseAccessorKey}.price`,
    priceList: `${baseAccessorKey}.priceList`,
  };

  const [formData, setFormData] = useValueControl({
    value: getValue(products, accessorKey.data),
    onChange: newFormData => {
      setProducts((value: AnyType) => {
        setValue(value, accessorKey.data, newFormData);

        return value;
      });
    },
  });

  const deferredFormData = useDeferredValue(JSON.stringify(formData));
  const deferredSelectedProductId = useDeferredValue(selectedProduct.id);

  const { data } = useSWR(
    {
      productId: deferredSelectedProductId,
      formData: deferredFormData,
      calculatorType: calculatorType,
    },
    fetcherFn,
  );

  useEffect(() => {
    if (data) {
      setProducts((oldValue: ProductsState) => {
        data?.price && setValue(oldValue, accessorKey.price, data.price);

        if (data?.values) {
          const oldProductData = getValue(oldValue, accessorKey.data);

          setValue(oldValue, accessorKey.data, deepmerge(oldProductData, data.values));
        }

        data?.priceList && setValue(oldValue, accessorKey.priceList, data.priceList);

        return { ...oldValue };
      });
    }
  }, [data, setProducts, accessorKey.price, accessorKey.priceList, accessorKey.data]);

  const deferredPrice = useDeferredValue(getValue(products, accessorKey.price));
  const deferredPriceList = useDeferredValue(getValue(products, accessorKey.priceList));

  return (
    <ProductContext.Provider
      value={{
        value: { ...getValue(products, accessorKey.data) },
        onChange: setFormData,

        price: deferredPrice,
        priceList: deferredPriceList,
      }}
    >
      <div className={className}>
        <ProductPageHeadline product={config.products[selectedProduct.id]} />

        <div className={styles.content} data-mobile={isMobile || undefined}>
          <Control
            formControl={{
              type: CONTROL.Object,
              ui: config.products[selectedProduct.id].formConfig?.ui ?? [],
              controls: config.products[selectedProduct.id].formConfig?.controls ?? {},
            }}
          />
        </div>
      </div>
    </ProductContext.Provider>
  );
}
