# Price Summary

Компонент отображает итоговую стоимость, детализацию изменения цены и состав заказа.

## Установка

```bash
npm i @cloud-ru/uikit-product-price-summary
```

[История изменений](./CHANGELOG.md)

## Итоговая сумма

Свойство `value` принимает точное значение или диапазон:

```ts
type TotalValueRange = {
  min: number;
  max: number;
};

// value?: number | TotalValueRange
```

Для числового значения свойство `totalSumType` управляет префиксом итоговой суммы:

| Значение | Отображение               |
| -------- | ------------------------- |
| `equal`  | Точная сумма без префикса |
| `from`   | Сумма с префиксом «от»    |
| `to`     | Сумма с префиксом «до»    |

```tsx
<PriceSummary value={5000} totalSumType='from' />
<PriceSummary value={10000} totalSumType='to' />
```

Для диапазона передайте `{ min, max }`. В этом случае `totalSumType` не применяется, а знак валюты выводится один раз в конце:

```tsx
<PriceSummary value={{ min: 5000, max: 10000 }} />
```

Если `value` не передан, компонент отображает `N/A`.

## Предварительный расчёт

Если `hint` не передан, компонент показывает локализованную подсказку о предварительном расчёте: «Предварительный расчёт. Фактическая стоимость зависит от потребления».

Переданный `hint` заменяет стандартный текст. Чтобы скрыть подсказку, передайте пустую строку:

```tsx
<PriceSummary value={5000} hint='Стоимость рассчитана на текущий период' />
<PriceSummary value={5000} hint='' />
```

## Базовая цена и изменение стоимости

`basePrice` добавляет перед итоговой суммой строку «Базовая цена». Нулевое значение не отображается.

`priceChange` добавляет строку «Изменение» и принимает объект следующего типа:

```ts
type PriceChangeDetails = {
  value: number;
  percentage?: number;
};
```

`priceChange.value` содержит изменение со знаком: положительное число означает увеличение стоимости, отрицательное — снижение. Если передан `percentage`, он выводится с тем же знаком. Нулевое изменение отображается без знака.

Компонент не вычисляет порог значимости. Потребитель должен самостоятельно определить, нужно ли передавать `priceChange`.

```tsx
<PriceSummary basePrice={10000} priceChange={{ value: 5000, percentage: 10 }} value={15000} />
```

В примере строка изменения будет отформатирована как `+5 000 ₽ (+10%)`.

## Покрытие грантом и доступность SKU

`PriceSummary` не выполняет сетевые запросы. Для заполнения признака покрытия и отделения недоступных позиций передайте `calculatePriceData`:

```ts
type CalculatePriceData = {
  skuResults: SkuPriceResult[];
  allow?: boolean;
};

type SkuPriceResult = {
  skuId?: string;
  skuCode?: string;
  resourceSpecCode?: string;
  resourceSpecCodeId?: string;
  skuAvailability?: boolean;
  coveredByGrants?: boolean;
};
```

Поле `allow` входит в контракт данных, но не влияет на сопоставление и отображение позиций. Тип `CalculatePriceResponse` оставлен как устаревший алиас `CalculatePriceData` для обратной совместимости.

Чтобы связать позицию инвойса с результатом расчёта:

1. Передайте `calculatePriceData` в одноимённое свойство компонента.
2. Добавьте `id` основной позиции `invoice`, у которой `primary === true`.
3. Значение `id` должно совпадать с `skuId`, `skuCode`, `resourceSpecCode` или `resourceSpecCodeId` из `skuResults`.

Только основные позиции поддерживают `id` и `coveredByGrant`. Для вторичных позиций с `primary === false` эти поля недоступны на уровне TypeScript.

### Покрытие грантом

Для сопоставленного SKU с `skuAvailability !== false` компонент записывает значение `coveredByGrants` в `coveredByGrant` позиции инвойса.

Если у всех основных позиций группы одинаковое значение `coveredByGrant`, метка покрытия отображается у заголовка группы. Для смешанной группы метки отображаются у отдельных позиций.

Если `calculatePriceData` не передан, `skuResults` пуст или `id` не найден, исходные значения `coveredByGrant` не изменяются.

### Недоступные позиции

Основная позиция с `skuAvailability === false` удаляется из исходной группы и переносится в первый агрегированный блок «Недоступно по договору». Заголовок блока отображается красным тегом, а метки покрытия грантом внутри него скрываются.

Недоступные позиции из всех групп объединяются в один блок. Если из исходной группы вынесена хотя бы одна позиция, её `price` и `quantity` скрываются, поскольку после разделения они могут стать неверными. Группа, в которой не осталось доступных позиций, полностью удаляется из обычной детализации.

```tsx
<PriceSummary
  invoice={[
    {
      title: 'Виртуальная машина',
      quantity: 3,
      price: 300,
      items: [
        { id: 'sku-1', primary: true, label: 'Процессор', quantity: 1, price: 100 },
        { id: 'sku-2', primary: true, label: 'Память', quantity: 1, price: 100 },
        { id: 'sku-3', primary: true, label: 'Диск', quantity: 1, price: 100 },
      ],
    },
  ]}
  calculatePriceData={{
    skuResults: [
      {
        skuCode: 'sku-1',
        skuAvailability: true,
        coveredByGrants: true,
      },
      {
        skuCode: 'sku-2',
        skuAvailability: true,
        coveredByGrants: false,
      },
      {
        skuCode: 'sku-3',
        skuAvailability: false,
        coveredByGrants: true,
      },
    ],
  }}
/>
```

В этом примере `sku-1` помечается как покрытый грантом, `sku-2` — как не покрытый, а `sku-3` переносится в блок «Недоступно по договору».
