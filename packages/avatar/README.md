# React Avatar

> ### Deprecation notice
> 
> Вместо данного компонента следует использовать пакет [`@snack-ui/avatar`](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/-/tree/master/packages/avatar),
> 
> См. документацию [здесь](https://frontend.cp.sbercloud.tech/snack/?path=/story/components-avatar--avatar)

## Installation
`npm i @sbercloud/uikit-product-avatar`

React component for drawing avatar component or placeholder

## Components interface 
```typescript
type AvatarProps = {
  name: string;
  variant: Variants;
  size?: Sizes;
  src?: string;
  status?: Status;
  onClick?: MouseEventHandler;
  className?: string;
};
```
