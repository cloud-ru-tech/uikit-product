# React Tooltip

## Installation
`npm i @sbercloud/uikit-product-tooltip`

## [Private Tooltip Changelog](https://git.sbercloud.tech/sbercloud-ui/uikit-product/-/tree/master/packages/tooltip-private/CHANGELOG.md)

## Usage
```typescript jsx
<Tooltip {...args}>
  <WrappedComponent/>
</Tooltip>
```

## Notes
При оборачивании тултипом, в верстке оборачиваемый компонент оборачивается посредством `span`.

Данный подход позволяет снять обязательность `ref` проперти у дочернего компонента, обернуть нативные элементы (такие, как текст).

Из этого следует быть внимательным к стилизации оборачиваемого компонента:
- паддинги и маржины должны отсутствовать в стилях `<WrappedComponent/>` (для целей внешнего выравнивания)
- если требуется сделать отступ для оборачиваемого компонента, необходимо передать соответствующие `margin` значения в `<Tooltip triggerClassName={classNameWithMargins}>`

## Components interface
```typescript
export enum Placements {
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

export enum TriggerTypes {
  Click = 'click',
  RightClick = 'right-click',
  Hover = 'hover',
  Focus = 'focus',
}

export enum TooltipType {
  Main = 'main',
  Info = 'info',
}

export type TooltipProps = {
  children: TooltipPrivateProps['children'];
  title?: string;
  content?: string | React.ReactNode;
  icon?: React.ReactElement;
  iconAction?(): void;
  classNameTrigger?: string;
  placement?: TooltipPrivateProps['placement'];
  type?: TooltipType;
  link?: LinkProps;
  trigger?: TooltipPrivateProps['trigger'];
};
```


