# React Popover

## Installation

`npm i @sbercloud/uikit-product-popover`

[Changelog](./CHANGELOG.md)

## Usage

```typescript jsx
<Popover content={'content'} placement={Popover.placements.BottomEnd}>
  <WrappedComponent />
</Popover>
```

###### Обратите внимание, что c 95% вероятностью вам нужен uncontrolled component.
###### Для это НЕ проставляйте проперть `visible` в компонент.
###### Используйте проперть `visible`, только если popover должен работать в режиме ТОЛЬКО программного закрытия-открытия.


## Notes

При оборачивании поповером, в верстке оборачиваемый компонент оборачивается посредством `span`.

Данный подход позволяет снять обязательность `ref` проперти у дочернего компонента, обернуть нативные элементы (такие, как текст).

Из этого следует быть внимательным к стилизации оборачиваемого компонента:

- паддинги и маржины должны отсутствовать в стилях `<WrappedComponent/>` (для целей внешнего выравнивания)
- если требуется сделать отступ для оборачиваемого компонента, необходимо передать соответствующие `margin` значения в `<Popover classNameTrigger={classNameWithMargins}>`

## Props

```typescript
enum Placements {
  Auto = 'auto',
  AutoStart = 'auto-start',
  AutoEnd = 'auto-end',
  Top = 'top',
  Bottom = 'bottom',
  Right = 'right',
  Left = 'left',
  TopStart = 'top-start',
  TopEnd = 'top-end',
  BottomStart = 'bottom-start',
  BottomEnd = 'bottom-end',
  RightStart = 'right-start',
  RightEnd = 'right-end',
  LeftStart = 'left-start',
  LeftEnd = 'left-end',
}

type PopoverProps = {
  children: TooltipPrivateProps['children'];
  content: React.ReactNode;
  classNameTrigger?: string;
  placement?: TooltipPrivateProps['placement'];
  visible?: boolean;
};
```
