# React Overlay Private

## Installation
`npm i @sbercloud/uikit-product-overlay-private`

[Changelog](./CHANGELOG.md)

Overlay for modals

```ts
export enum Variants {
  Fixed = 'Fixed',
  Absolute = 'Absolute',
}

type OverlayPrivateOwnProps = {
  variant?: Variants;
  onClick?: MouseEventHandler;
  className?: string;
};
```
