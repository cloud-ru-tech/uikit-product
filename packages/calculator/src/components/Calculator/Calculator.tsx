import { LayoutType } from '@cloud-ru/uikit-product-utils';

import { CalculatorContextProvider } from '../../contexts';
import { CalculatorType, CatalogConfig, FetcherFn, FormValues, PlatformType, ProductState, State } from '../../types';
import { CalculatorContent } from '../CalculatorContent';
import { Catalog } from '../Catalog';

export type CalculatorProps = {
  /** Тип устройства @default desktop*/
  layoutType?: LayoutType;
  /** Тип калькулятора @default main*/
  calculatorType?: CalculatorType;
  /** Конфигурация платформ/продуктов/каталога */
  config: CatalogConfig;
  /** Функция для запроса цен по продукту */
  fetcherFn: FetcherFn;
  /** Колбеки на действия внутри калькулятора */
  actions: {
    /** Колбек на выбор платформы в каталоге */
    onPlatformSelect?(platform: PlatformType): void;
    /** Колбек на выбор продукта в каталоге */
    onProductSelect?(productId: string): void;
    /** Колбек на удаление продукта в корзине */
    onProductDelete?(productId: string): void;
    /** Колбек на кнопку 'Начать расчет' */
    onStartClick?(): void;
    /** Колбек на открытие каталога */
    onCatalogOpen?(): void;
    /** Колбек на подключение продукта в консоли */
    onConnectClick?(id: string, value: FormValues): void;
    /** Колбек клика на кнопку "Поделиться ссылкой" */
    onShareClick?(state: State): Promise<void>;
    /** Колбек клика на кнопку "Скачать расчет" */
    onDownloadFileClick?(state: State): Promise<void>;
    /** Колбек клика на кнопку "Запросить консультацию" */
    onRequestConsultationClick?(state: State): void;
  };
  /** Колбэк вызова при изменении любого контрола для аналитики */
  onAnalyticsClick?(clickContent: string, uniqueId: string): void;
  /** Изображение на заднем фоне в состоянии "пустой" корзины */
  bgImage?: string;
  /** Id продукта который будет "по умолчанию" в корзине*/
  initialActiveProduct?: string;
  /** Начальное состояние корзины */
  iniState?: Record<string, ProductState[]>;
};

export function Calculator({
  config,
  layoutType,
  calculatorType,

  fetcherFn,

  initialActiveProduct,
  iniState,

  bgImage,

  actions,
  onAnalyticsClick,
}: CalculatorProps) {
  return (
    <CalculatorContextProvider
      config={config}
      fetcherFn={fetcherFn}
      calculatorType={calculatorType}
      layoutType={layoutType}
      iniState={iniState}
      initialActiveProduct={initialActiveProduct}
      actions={actions}
      onAnalyticsClick={onAnalyticsClick}
    >
      <CalculatorContent bgImage={bgImage} />

      <Catalog />
    </CalculatorContextProvider>
  );
}
