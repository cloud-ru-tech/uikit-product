# React Link

> ### Deprecation notice
>
> Вместо данного компонента следует использовать пакет [`@snack-ui/link`](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/-/tree/master/packages/link),
>
> См. документацию [здесь](https://frontend.cp.sbercloud.tech/snack/?path=/story/components-link--link)


## Installation

`npm i @sbercloud/uikit-product-link`

## Props

```typescript
enum Variant {
  OnPrimary = 'primary',
  OnDark = 'dark',
}

enum Sizes {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

type LinkProps = WithSupportProps<{
  className?: string;
  variant?: Variant; // default: Variant.OnPrimary,
  text?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  showSuffixIcon?: boolean; // default: false
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']; // defualt: '_blank'
  href?: string; // default '#'
  disabled?: boolean; // default: false
  size?: Sizes; // default: Sizes.Medium
  prefixIcon?: React.ReactElement;
}>;
```
