# React Tooltip

## Installation
`npm i @sbercloud/uikit-react-tooltip`

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


