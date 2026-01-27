import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { LAYOUT_TYPE, LayoutType } from '@cloud-ru/uikit-product-utils';

import { CalculatorProps } from '../components';
import { getDefaultValues } from '../components/Controls/utils';
import { DEFAULT_CATEGORY, DEFAULT_PRICE, PLATFORM } from '../constants';
import { CatalogConfig, FetcherFn, FormValues, PlatformType, PRICE_PERIOD, PricePeriod, ProductState } from '../types';
import { CALCULATOR_TYPE, CalculatorType } from '../types/CalculatorType';

export type SelectedProduct = { id: string; idx: number } | null;

export type ProductsState = Record<string, ProductState[]>;

type CalculatorContextType = {
  selectedPlatform: PlatformType;
  setSelectedPlatform(platform: PlatformType): void;

  selectedCategory: string;
  setSelectedCategory(category: string): void;

  catalogOpen: boolean;
  setCatalogOpen(open: boolean): void;

  pricePeriod: PricePeriod;
  setPricePeriod(period: PricePeriod): void;

  selectedProduct: SelectedProduct;
  setSelectedProduct(value: SelectedProduct): void;

  layoutType: LayoutType;
  calculatorType: CalculatorType;

  config: CatalogConfig;

  fetcherFn: FetcherFn;

  products: ProductsState;
  setProducts(products: FormValues): void;

  actions: CalculatorProps['actions'];
  onAnalyticsClick: NonNullable<CalculatorProps['onAnalyticsClick']>;
};

const noop = () => {};

export const CalculatorContext = createContext<CalculatorContextType>({
  selectedCategory: DEFAULT_CATEGORY,
  setSelectedCategory: noop,

  selectedPlatform: PLATFORM.Evolution,
  setSelectedPlatform: noop,

  catalogOpen: false,
  setCatalogOpen: noop,

  pricePeriod: PRICE_PERIOD.Month,
  setPricePeriod: noop,

  selectedProduct: null,
  setSelectedProduct: noop,

  calculatorType: CALCULATOR_TYPE.Main,
  layoutType: LAYOUT_TYPE.Desktop,

  config: {} as CatalogConfig,
  fetcherFn: (async () => undefined) as unknown as FetcherFn,

  products: {} as ProductsState,
  setProducts: noop,

  actions: {},
  onAnalyticsClick: noop,
});

export const useCalculatorContext = () => useContext(CalculatorContext);

type CalculatorContextProviderProps = PropsWithChildren<
  Pick<
    CalculatorProps,
    | 'actions'
    | 'calculatorType'
    | 'fetcherFn'
    | 'iniState'
    | 'initialActiveProduct'
    | 'config'
    | 'layoutType'
    | 'onAnalyticsClick'
  >
>;

export function CalculatorContextProvider({
  layoutType = LAYOUT_TYPE.Desktop,
  calculatorType = CALCULATOR_TYPE.Main,

  fetcherFn,

  config,
  iniState,
  initialActiveProduct,

  actions,
  onAnalyticsClick,

  children,
}: CalculatorContextProviderProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>(() => {
    if (initialActiveProduct) {
      return config.products?.[initialActiveProduct].platform;
    }

    return config.platforms[0].id;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>(config.catalog[selectedPlatform][0].id);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(() => {
    if (iniState && Object.keys(iniState).length > 0) {
      return { id: Object.keys(iniState)[0], idx: 0 };
    }

    if (initialActiveProduct) {
      return { id: initialActiveProduct, idx: 0 };
    }

    return null;
  });
  const [open, setOpen] = useState<boolean>(false);

  const [pricePeriod, setPricePeriod] = useState<PricePeriod>(PRICE_PERIOD.Month);

  const [products, setProducts] = useState<ProductsState>(() => {
    if (iniState && Object.keys(iniState).length > 0) {
      return iniState;
    }

    if (initialActiveProduct) {
      const controls = config.products[initialActiveProduct].formConfig?.controls;

      if (controls) {
        return {
          [initialActiveProduct]: [
            {
              data: { ...getDefaultValues(controls ?? {}), productQuantity: 1 },
              price: DEFAULT_PRICE,
            },
          ],
        };
      }
    }

    return {};
  });

  const onAnalyticsClickCalculator = (value: string, control: string) => {
    if (selectedProduct && onAnalyticsClick) {
      onAnalyticsClick(value, `${control}-${selectedProduct.id}`);
    }
  };

  return (
    <CalculatorContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,

        selectedPlatform,
        setSelectedPlatform,

        pricePeriod,
        setPricePeriod,

        selectedProduct,
        setSelectedProduct,

        catalogOpen: open,
        setCatalogOpen: setOpen,

        layoutType,
        calculatorType,
        config,

        fetcherFn,

        products,
        setProducts,

        actions,
        onAnalyticsClick: onAnalyticsClickCalculator,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}
