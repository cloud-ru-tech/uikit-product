# Руководство по работе с калькулятором продуктов

## Содержание

1. [Обзор системы](#обзор-системы)
2. [Архитектура пакета](#архитектура-пакета)
3. [Добавление новой платформы](#добавление-новой-платформы)
4. [Добавление нового продукта](#добавление-нового-продукта)
5. [Конфигурация формы продукта](#конфигурация-формы-продукта)
6. [Доступные типы контролов](#доступные-типы-контролов)
7. [Настройка каталога](#настройка-каталога)
8. [Примеры](#примеры)

---

## Обзор системы

Калькулятор продуктов (`@sbercloud/uikit-product-calculator`) — это система для расчета стоимости облачных продуктов. Калькулятор позволяет:

- Отображать каталог платформ и продуктов
- Настраивать формы конфигурации продуктов
- Рассчитывать стоимость на основе выбранных параметров
- Экспортировать и делиться расчетами

### Основные понятия

- **Платформа** (`Platform`) — облачная платформа (Evolution Cloud.ru, Advanced Cloud.ru, VMware и т.д.)
- **Продукт** (`Product`) — облачный сервис, который можно рассчитать (Compute, Object Storage, Database и т.д.)
- **Конфигурация формы** (`FormConfig`) — описание формы с полями и контролами для настройки продукта
- **Категория** (`Category`) — группа продуктов в каталоге (Популярное, Free Tier, Инфраструктура и т.д.)

---

## Архитектура пакета

### Структура директорий

```
packages/calculator/src/
├── components/          # UI компоненты калькулятора
│   ├── Calculator/     # Основной компонент калькулятора
│   ├── Catalog/        # Компонент каталога
│   ├── ProductPage/   # Страница продукта
│   └── Controls/      # Контролы для форм
│       ├── AlertControl/
│       ├── ArrayControl/
│       ├── CarouselControl/
│       ├── SelectControl/
│       ├── StepperControl/
│       └── ...
├── config/             # Конфигурации платформ и продуктов
│   ├── config.tsx      # Главный файл конфигурации
│   ├── platforms/      # Конфигурации платформ
│   │   ├── evolution/
│   │   ├── advanced/
│   │   └── vmware/
│   └── utils/          # Утилиты для конфигураций
├── types/              # TypeScript типы
├── services/           # Сервисы (API запросы, экспорт и т.д.)
├── hooks/              # React хуки
└── contexts/           # React контексты
```

### Типы конфигурации

```typescript
type CatalogConfig = {
  platforms: Platform[]; // Массив платформ
  products: Record<string, Product>; // Объект с продуктами (id -> Product)
  catalog: Record<PlatformType, Category[]>; // Каталог по платформам
};

type Product = {
  id: string; // Уникальный ID продукта
  label: string; // Название
  caption: string; // Описание
  icon: JSXElementConstructor; // Иконка
  platform: PlatformType; // Платформа
  dataTestId?: string; // Тестовый ID
  freeTier?: boolean; // Флаг Free Tier
  enableChangeProductQuantity?: boolean; // Можно ли менять кол-во
  disabledProductQuantity?: boolean; // Заблокировано ли изменение кол-ва
  productQuantityValues?: {
    // Ограничения количества
    min?: number;
    max?: number;
  };
  enableConnectToConsole?: boolean; // Можно ли подключить через консоль
  formConfig?: FormConfig; // Конфигурация формы
  hasPayaGo?: boolean; // Поддержка Pay As You Go
};

type Platform = {
  id: PlatformType; // ID платформы
  icon: ReactNode; // Иконка
  label: string; // Название
  description: string; // Описание
  access: 'public' | 'request' | 'legal'; // Тип доступа
  dataTestId: string; // Тестовый ID
  onClick?(id: PlatformType): void; // Колбек клика
};
```

---

## Добавление новой платформы

### Шаг 1: Добавить константу платформы

В файле `src/constants.ts` уже определены платформы:

```typescript
export const PLATFORM = {
  Advanced: 'advanced',
  MlSpace: 'mlspace',
  VmWare: 'vmware',
  Evolution: 'evolution',
  Test: 'test',
};
```

Если нужно добавить новую, добавьте её в этот объект.

### Шаг 2: Создать директорию платформы

Создайте директорию в `src/config/platforms/your-platform/`:

```
your-platform/
├── constants.ts      # Константы продуктов
├── platform.tsx     # Конфигурация платформы
├── products.ts      # Регистрация продуктов
├── catalog.tsx      # Каталог категорий
└── product-config/  # Конфигурации форм продуктов
    ├── index.ts
    └── YourProduct.ts
```

### Шаг 3: Создать конфигурацию платформы

**`platform.tsx`**

```typescript
import { YourPlatformSVG } from '@sbercloud/uikit-product-icons';
import { PLATFORM } from '../../../constants';
import { Platform } from '../../../types';

export const YOUR_PLATFORM: Platform = {
  id: PLATFORM.YourPlatform,
  icon: <YourPlatformSVG />,
  label: 'Your Platform Name',
  description: 'Описание платформы',
  access: 'public', // или 'request' или 'legal'
  dataTestId: 'calculator-catalog-platform-your-platform',
};
```

### Шаг 4: Создать константы продуктов

**`constants.ts`**

```typescript
export const YOUR_PLATFORM_PRODUCT = {
  YourProduct1: 'yourProduct1',
  YourProduct2: 'yourProduct2',
} as const;
```

### Шаг 5: Регистрировать платформу в главном конфиге

**`src/config/config.tsx`**

```typescript
import { YOUR_PLATFORM, YOUR_PRODUCTS, YOUR_CATALOG } from './platforms/your-platform';

export const CATALOG_CONFIG: CatalogConfig = {
  platforms: [
    EVOLUTION_PLATFORM,
    ADVANCED_PLATFORM,
    VM_WARE_PLATFORM,
    YOUR_PLATFORM, // Добавить новую платформу
  ],

  products: {
    ...EVOLUTION_PRODUCTS,
    ...ADVANCED_PRODUCTS,
    ...VM_WARE_PRODUCTS,
    ...YOUR_PRODUCTS, // Добавить продукты
  },

  catalog: {
    ...EVOLUTION_CATALOG,
    ...ADVANCED_CATALOG,
    ...VM_WARE_CATALOG,
    ...YOUR_CATALOG, // Добавить каталог
  },
};
```

---

## Добавление нового продукта

### Шаг 1: Создать конфигурацию формы продукта

Создайте файл в `src/config/platforms/your-platform/product-config/YourProduct.ts`:

```typescript
import { CONTROL, FormConfig } from '../../../../components';

export const YOUR_PRODUCT_FORM_CONFIG: FormConfig = {
  ui: ['alertStart', 'productSetting', ['option1', 'option2']],
  controls: {
    alertStart: {
      type: CONTROL.Alert,
      uiProps: {
        appearance: 'info',
        outline: true,
        description: 'Информационное сообщение для пользователя',
      },
      accessorKey: 'start',
    },

    productSetting: {
      type: CONTROL.SelectSingle,
      decoratorProps: {
        label: 'Настройка продукта',
        labelTooltip: 'Подсказка о настройке',
      },
      accessorKey: 'productSetting',
      defaultValue: 'value1',
      items: [
        { value: 'value1', label: 'Вариант 1' },
        { value: 'value2', label: 'Вариант 2' },
      ],
    },

    option1: {
      type: CONTROL.Stepper,
      decoratorProps: {
        label: 'Количество',
      },
      accessorKey: 'option1',
      defaultValue: 1,
      uiProps: {
        min: 1,
        max: 100,
        postfix: 'шт',
      },
    },

    option2: {
      type: CONTROL.Toggle,
      defaultValue: false,
      accessorKey: 'option2',
      decoratorProps: {
        label: 'Дополнительная опция',
      },
    },
  },
};
```

### Шаг 2: Экспортировать конфигурацию

**`product-config/index.ts`**

```typescript
export { YOUR_PRODUCT_FORM_CONFIG } from './YourProduct';
```

### Шаг 3: Добавить константу продукта

**`constants.ts`**

```typescript
export const YOUR_PLATFORM_PRODUCT = {
  // ... существующие продукты
  YourProduct: 'yourProduct',
} as const;
```

### Шаг 4: Зарегистрировать продукт

**`products.ts`**

```typescript
import { YourProductSVG } from '@sbercloud/uikit-product-icons';
import { PLATFORM } from '../../../constants';
import { CatalogConfig } from '../../../types';
import { YOUR_PLATFORM_PRODUCT } from './constants';
import { YOUR_PRODUCT_FORM_CONFIG } from './product-config';

export const YOUR_PLATFORM_PRODUCTS: CatalogConfig['products'] = {
  [YOUR_PLATFORM_PRODUCT.YourProduct]: {
    id: YOUR_PLATFORM_PRODUCT.YourProduct,
    platform: PLATFORM.YourPlatform,
    label: 'Your Product Name',
    caption: 'Описание продукта',
    icon: YourProductSVG,
    dataTestId: 'yourProduct',
    formConfig: YOUR_PRODUCT_FORM_CONFIG,
    enableChangeProductQuantity: true,
    enableConnectToConsole: true,
  },
};
```

### Шаг 5: Добавить продукт в каталог

**`catalog.tsx`**

```typescript
import { CATEGORY, PLATFORM } from '../../../constants';
import { CatalogConfig } from '../../../types';
import { YOUR_PLATFORM_PRODUCT } from './constants';

export const YOUR_PLATFORM_CATALOG: CatalogConfig['catalog'] = {
  [PLATFORM.YourPlatform]: [
    {
      id: CATEGORY.Popular,
      label: 'Популярное',
      dataTestId: 'popular',
      visibleProducts: [
        YOUR_PLATFORM_PRODUCT.YourProduct,
        // ... другие продукты
      ],
    },
  ],
};
```

---

## Конфигурация формы продукта

### Структура FormConfig

```typescript
type FormConfig = {
  ui: FormRow[];                    // Схема расположения контролов
  controls: Record<string, FormControl>; // Определения контролов
  defaultValue?: FormValues;        // Начальные значения
  watchedControls?: Record<string, string>; // Отслеживаемые поля
  relateFn?: (watchedValues: FormValues) => {...}; // Функция зависимостей
  visible?: boolean;                 // Видимость всей формы
};
```

### UI схема (массив `ui`)

Элементы массива `ui` определяют расположение контролов:

```typescript
ui: [
  'control1', // Один контрол на строку
  ['control2', 'control3'], // Два контрола в ряд
  ['control4'], // Один контрол (в массиве)
  'alertControl', // Ещё один контрол
];
```

### Accessor Key (путь к значению)

`accessorKey` — это путь, по которому сохраняется значение в форме:

```typescript
accessorKey: 'simpleField'; // Простое поле
accessorKey: 'nested.field'; // Вложенное поле
accessorKey: 'array[0].field'; // Элемент массива
accessorKey: 'evs.systemDisk.diskSpace'; // Глубокая вложенность
```

### Зависимости между контролами

#### watchedControls + relateFn

Контрол может зависеть от значений других контролов:

```typescript
vCpuCoreCount: {
  type: CONTROL.Slider,
  accessorKey: 'vCpuCoreCount',
  defaultValue: '1',
  items: [1, 2, 4, 8],
  decoratorProps: {
    label: 'Количество ядер vCPU',
  },
  watchedControls: {
    guaranteedPart: 'guaranteedPart' // Отслеживаем это поле
  },
  relateFn: ({ guaranteedPart }) => {
    // Вычисляем доступные варианты на основе guaranteedPart
    const items = guaranteedPartToVCpuMap?.[guaranteedPart];
    if (items?.length > 0) {
      return {
        items: items, // Обновляем список опций
      };
    }
  },
}
```

#### onChangeFn

Для явного изменения других полей при изменении текущего:

```typescript
control: {
  type: CONTROL.SelectSingle,
  accessorKey: 'control',
  onChangeFn: (value, setValue) => {
    const arr = [['control', value]]; // Устанавливаем текущее значение

    if (value === 'option1') {
      // При выборе option1 сбрасываем другие поля
      arr.push(['dependentField1', '']);
      arr.push(['dependentField2', 0]);
    }

    setValue(arr);
  },
}
```

---

## Доступные типы контролов

### CONTROL.Alert

Информационное сообщение (не имеет значения):

```typescript
{
  type: CONTROL.Alert,
  uiProps: {
    appearance: 'info' | 'warning' | 'error',
    outline: true | false,
    description: ReactNode, // Текст сообщения
  },
  accessorKey: 'alertKey',
}
```

### CONTROL.SelectSingle

Одиночный выбор из списка:

```typescript
{
  type: CONTROL.SelectSingle,
  decoratorProps: {
    label: 'Выбор опции',
    labelTooltip: 'Подсказка',
  },
  accessorKey: 'selectedOption',
  defaultValue: 'option1',
  items: [
    { value: 'option1', label: 'Опция 1' },
    { value: 'option2', label: 'Опция 2' },
  ],
  uiProps: {
    searchable: true,      // Поиск в списке
    showClearButton: true,  // Кнопка очистки
  },
}
```

### CONTROL.SelectMultiple

Множественный выбор:

```typescript
{
  type: CONTROL.SelectMultiple,
  decoratorProps: {
    label: 'Выбор нескольких',
  },
  accessorKey: 'selectedOptions',
  defaultValue: [],
  items: [
    { value: 'opt1', label: 'Опция 1' },
    { value: 'opt2', label: 'Опция 2' },
  ],
}
```

### CONTROL.Segmented

Сегментированный контрол (кнопки выбора):

```typescript
{
  type: CONTROL.Segmented,
  decoratorProps: {
    label: 'Тип ресурса',
  },
  accessorKey: 'resourceType',
  defaultValue: 'small',
  items: [
    { value: 'small', label: 'Малый' },
    { value: 'medium', label: 'Средний' },
    { value: 'large', label: 'Большой' },
  ],
}
```

### CONTROL.Carousel

Карусель с карточками выбора:

```typescript
{
  type: CONTROL.Carousel,
  decoratorProps: {
    label: 'Гарантированная доля vCPU',
    labelTooltip: 'Описание параметра',
  },
  accessorKey: 'guaranteedPart',
  defaultValue: '10',
  items: [
    {
      value: '10',
      label: '10% доля',
      description: 'Для тестирования',
    },
    {
      value: '30',
      label: '30% доля',
      description: 'Для стандартной нагрузки',
    },
  ],
}
```

### CONTROL.Stepper

Счетчик (числовое значение с кнопками +/-):

```typescript
{
  type: CONTROL.Stepper,
  decoratorProps: {
    label: 'Количество',
  },
  accessorKey: 'quantity',
  defaultValue: 1,
  uiProps: {
    min: 0,
    max: 100,
    step: 1,
    postfix: 'шт', // Постфикс (шт, ГБ, МБ и т.д.)
    showHint: true, // Показывать подсказку при наведении
  },
}
```

### CONTROL.Slider

Слайдер для выбора значения:

```typescript
{
  type: CONTROL.Slider,
  decoratorProps: {
    label: 'Количество ядер vCPU',
  },
  accessorKey: 'vCpuCoreCount',
  defaultValue: '1',
  items: [1, 2, 4, 8, 16], // Доступные значения
}
```

### CONTROL.Toggle

Переключатель (чекбокс):

```typescript
{
  type: CONTROL.Toggle,
  decoratorProps: {
    label: 'Включить опцию',
  },
  accessorKey: 'enabled',
  defaultValue: false,
}
```

### CONTROL.ToggleCards

Карточки-переключатели:

```typescript
{
  type: CONTROL.ToggleCards,
  decoratorProps: {
    label: 'Тип тарифа',
  },
  accessorKey: 'tariffType',
  defaultValue: 'basic',
  items: [
    {
      value: 'basic',
      label: 'Базовый',
      description: 'Описание базового тарифа',
    },
    {
      value: 'premium',
      label: 'Премиум',
      description: 'Описание премиум тарифа',
    },
  ],
}
```

### CONTROL.Table

Таблица с несколькими числовыми полями:

```typescript
{
  type: CONTROL.Table,
  decoratorProps: {
    label: 'Ресурсы',
    labelTooltip: 'Настройка ресурсов',
  },
  accessorKey: 'resources',
  defaultValue: {
    cpu: 0,
    ram: 0,
    disk: 0,
  },
  counter: { // Опциональный счетчик времени
    label: 'Время работы в месяц',
    accessorKey: 'workTime',
    uiProps: {
      min: 1,
      max: 744,
      postfix: 'ч',
    },
  },
  rows: [
    {
      label: 'Количество vCPU',
      accessorKey: 'cpu',
      uiProps: {
        min: 0,
        max: 9999,
        postfix: 'шт',
      },
    },
    {
      label: 'Оперативная память',
      accessorKey: 'ram',
      uiProps: {
        min: 0,
        max: 99999,
        postfix: 'ГБ',
      },
    },
  ],
}
```

### CONTROL.Array

Массив повторяющихся элементов:

```typescript
{
  type: CONTROL.Array,
  max: 7, // Максимальное количество элементов
  accessorKey: 'additionalDisks',
  defaultValue: [],
  addText: 'Добавить диск',
  ui: ['disk'], // Схема для каждого элемента массива
  controls: {
    disk: getDisk({ // Конфигурация для элемента
      space: {
        label: 'Дополнительный диск',
        accessorKey: 'diskSpace',
        defaultValue: 10,
        uiProps: {
          min: 10,
          max: 4096,
        },
      },
      specification: {
        accessorKey: 'specification',
        defaultValue: 'SSD',
      },
    }),
  },
}
```

### CONTROL.Object

Группировка контролов в объект:

```typescript
{
  type: CONTROL.Object,
  defaultValue: {
    ipQuantity: 1,
    bindingIpAddressesQuantity: 0,
  },
  ui: [['ipQuantity', 'bindingIpAddressesQuantity']],
  controls: {
    ipQuantity: {
      type: CONTROL.Stepper,
      accessorKey: 'ipQuantity',
      // ...
    },
    bindingIpAddressesQuantity: {
      type: CONTROL.Stepper,
      accessorKey: 'bindingIpAddressesQuantity',
      // ...
    },
  },
  visible: false, // Скрытый объект для служебных данных
}
```

### CONTROL.ToggleObject

Объект с переключателем включения/выключения:

```typescript
{
  type: CONTROL.ToggleObject,
  decoratorProps: {
    label: 'Дополнительные настройки',
  },
  accessorKey: 'additionalSettings',
  defaultValue: false, // По умолчанию выключено
  ui: ['setting1', 'setting2'],
  controls: {
    setting1: { /* ... */ },
    setting2: { /* ... */ },
  },
}
```

---

## Настройка каталога

### Структура Category

```typescript
type Category = {
  id: string; // ID категории (из CATEGORY)
  label: string; // Название категории
  dataTestId: string; // Тестовый ID
  visibleProducts: string[]; // Массив ID продуктов
  banner?: ReactNode; // Опциональный баннер
};
```

### Доступные категории

```typescript
export const CATEGORY = {
  Popular: 'popular',
  FreeTier: 'free-tier',
  Computations: 'computations',
  Network: 'network',
  Containerization: 'containerization',
  Storage: 'storage',
  Database: 'database',
  Development: 'development',
  Analytic: 'analytic',
  ML: 'ml-ai-tools',
} as const;
```

### Пример каталога

```typescript
export const YOUR_PLATFORM_CATALOG: CatalogConfig['catalog'] = {
  [PLATFORM.YourPlatform]: [
    {
      id: CATEGORY.Popular,
      label: 'Популярное',
      dataTestId: 'popular',
      visibleProducts: [
        YOUR_PRODUCT.Product1,
        YOUR_PRODUCT.Product2,
      ],
    },
    {
      id: CATEGORY.FreeTier,
      label: 'Free Tier',
      dataTestId: 'free-tier',
      visibleProducts: [
        YOUR_PRODUCT.FreeProduct,
      ],
      banner: (
        <Alert
          appearance='info'
          outline
          description={
            <>
              Free tier — это облачные ресурсы, за которые не надо платить.
              Подробнее в{' '}
              <Link href='...' text='документации' />
            </>
          }
        />
      ),
    },
    {
      id: CATEGORY.Storage,
      label: 'Хранение',
      dataTestId: 'storage',
      visibleProducts: [
        YOUR_PRODUCT.StorageProduct,
      ],
    },
  ],
};
```

---

## Примеры

### Простой продукт (Public IP)

**`EvolutionPublicIp.ts`**

```typescript
import { CONTROL, FormConfig } from '../../../../components';

export const EVOLUTION_PUBLIC_IP_FORM_CONFIG: FormConfig = {
  ui: [['directCount', 'floatingCount']],
  controls: {
    directCount: {
      type: CONTROL.Stepper,
      defaultValue: 0,
      accessorKey: 'directCount',
      decoratorProps: {
        label: 'Аренда прямого IP-адреса',
        labelTooltip: 'Описание прямого IP',
      },
      uiProps: {
        min: 0,
        step: 1,
        max: 50,
        postfix: 'шт',
      },
    },
    floatingCount: {
      type: CONTROL.Stepper,
      accessorKey: 'floatingCount',
      defaultValue: 0,
      decoratorProps: {
        label: 'Аренда плавающего IP-адреса',
        labelTooltip: 'Описание плавающего IP',
      },
      uiProps: {
        min: 0,
        step: 1,
        max: 50,
        postfix: 'шт',
      },
    },
  },
};
```

### Сложный продукт (Cloud Server) с зависимостями

**`EvolutionCloudServer.tsx`** (упрощенная версия)

```typescript
export const EVOLUTION_CLOUD_SERVER_FORM_CONFIG: FormConfig = {
  ui: [
    'alertStart',
    'guaranteedPart',
    ['os'],
    ['vCpuCoreCount', 'ramAmount'],
    ['systemDisk'],
    'alertAdditional',
    ['additionalDisks'],
    'networkIsNeeded',
  ],
  controls: {
    // Информационный алерт
    alertStart: {
      type: CONTROL.Alert,
      uiProps: {
        appearance: 'info',
        outline: true,
        description: 'Информация для пользователя',
      },
      accessorKey: 'start',
    },

    // Карусель выбора
    guaranteedPart: {
      decoratorProps: {
        label: 'Гарантированная доля vCPU',
        labelTooltip: 'Описание параметра',
      },
      type: CONTROL.Carousel,
      accessorKey: 'guaranteedPart',
      defaultValue: '10',
      items: [
        { value: '10', label: '10% доля', description: 'Для тестирования' },
        { value: '30', label: '30% доля', description: 'Стандартная нагрузка' },
        { value: '100', label: '100% доля', description: 'Высокая нагрузка' },
      ],
    },

    // Выбор операционной системы
    os: {
      type: CONTROL.SelectSingle,
      decoratorProps: {
        label: 'Операционная система',
      },
      accessorKey: 'os',
      defaultValue: 'Ubuntu 22.04',
      items: [
        { value: 'Ubuntu 22.04', label: 'Ubuntu 22.04' },
        { value: 'CentOS 9', label: 'CentOS 9' },
      ],
    },

    // Слайдер с зависимостью
    vCpuCoreCount: {
      type: CONTROL.Slider,
      accessorKey: 'vCpuCoreCount',
      defaultValue: '1',
      items: [1, 2, 4, 8],
      decoratorProps: {
        label: 'Количество ядер vCPU',
      },
      watchedControls: { guaranteedPart: 'guaranteedPart' },
      relateFn: ({ guaranteedPart }) => {
        const items = guaranteedPartToVCpuMap?.[guaranteedPart];
        if (items?.length > 0) {
          return { items: items };
        }
      },
    },

    // Сегментированный контрол с двойной зависимостью
    ramAmount: {
      type: CONTROL.Segmented,
      decoratorProps: {
        label: 'Количество оперативной памяти (RAM)',
      },
      defaultValue: '1',
      items: [
        { value: '1', label: '1 ГБ' },
        { value: '2', label: '2 ГБ' },
      ],
      accessorKey: 'ramAmount',
      watchedControls: {
        guaranteedPart: 'guaranteedPart',
        vCpuCoreCount: 'vCpuCoreCount',
      },
      relateFn: ({ guaranteedPart, vCpuCoreCount }) => {
        const items = guaranteedPartVCpuToRamMap?.[guaranteedPart]?.[vCpuCoreCount];
        if (items?.length > 0) {
          return {
            items: generateRamItems(items),
          };
        }
      },
    },

    // Объект с диском (используя утилиту)
    systemDisk: getDisk({
      space: {
        label: 'Загрузочный диск',
        accessorKey: 'evs.systemDisk.diskSpace',
        defaultValue: 10,
        uiProps: {
          min: 10,
          max: 4096,
        },
      },
      specification: {
        accessorKey: 'evs.systemDisk.specification',
        defaultValue: 'SSD',
        uiProps: {
          disabled: true,
        },
      },
    }),

    // Массив дополнительных дисков
    additionalDisks: {
      type: CONTROL.Array,
      max: 7,
      accessorKey: 'evs.additionalDisks',
      defaultValue: [],
      addText: 'Добавить диск',
      ui: ['disk'],
      controls: {
        disk: getDisk({
          space: {
            label: 'Дополнительный диск',
            accessorKey: 'diskSpace',
            defaultValue: 10,
            uiProps: {
              min: 10,
              max: 4096,
            },
          },
          specification: {
            accessorKey: 'specification',
            defaultValue: 'SSD',
            uiProps: {
              disabled: true,
            },
          },
        }),
      },
    },

    // Переключатель
    networkIsNeeded: {
      type: CONTROL.Toggle,
      defaultValue: false,
      accessorKey: 'networkIsNeeded',
      decoratorProps: {
        label: 'Аренда публичного IP',
      },
    },
  },
};
```

### Использование утилит

В `src/config/utils/` есть готовые утилиты для типовых конфигураций:

- **`getDisk()`** — конфигурация диска (объем + тип)
- **`diskPostgreSqlMySQL()`** — диск для PostgreSQL/MySQL
- **`eip()`** — Elastic IP
- **`obs()`** — Object Storage

**Пример использования утилиты:**

```typescript
import { getDisk } from '../../../utils';

const systemDisk = getDisk({
  space: {
    label: 'Объем диска',
    accessorKey: 'systemDisk.diskSpace',
    defaultValue: 10,
    uiProps: {
      min: 10,
      max: 4096,
    },
  },
  specification: {
    accessorKey: 'systemDisk.specification',
    defaultValue: 'SSD',
  },
});
```

---

## Рекомендации и лучшие практики

### Именование

- Имена файлов конфигураций продуктов: `PlatformProductName.ts` (например, `EvolutionCloudServer.tsx`)
- Имена констант продуктов: `PLATFORM_PRODUCT_ProductName` (например, `EVOLUTION_PRODUCT_EvolutionCloudServer`)
- Имена конфигураций форм: `PLATFORM_PRODUCT_FORM_CONFIG` (например, `EVOLUTION_CLOUD_SERVER_FORM_CONFIG`)

### Организация кода

1. **Разделяйте сложные конфигурации** на отдельные функции или константы
2. **Используйте утилиты** для повторяющихся паттернов (диски, сети и т.д.)
3. **Группируйте связанные контролы** в объекты (`CONTROL.Object`)
4. **Используйте `watchedControls` и `relateFn`** для динамических зависимостей

### Тестирование

- Всегда добавляйте `dataTestId` для продуктов и платформ
- Используйте осмысленные `accessorKey`, соответствующие структуре данных API

### Производительность

- Избегайте сложных вычислений в `relateFn` — используйте таблицы соответствий (maps)
- Минимизируйте количество зависимостей (`watchedControls`)

---

## Заключение

Это руководство покрывает основные аспекты работы с калькулятором продуктов. Для более глубокого понимания изучайте примеры в:

- `packages/calculator/src/config/platforms/evolution/product-config/`
- `packages/calculator/src/config/platforms/advanced/product-config/`
- `packages/calculator/src/config/platforms/vmware/product-config/`

При добавлении новых продуктов всегда сверяйтесь с существующими примерами для консистентности и правильного использования API.
