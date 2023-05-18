# React Pagination Private

> ### Deprecation notice
>
> Вместо данного компонента следует использовать пакет [`@snack-ui/pagination`](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/-/tree/master/packages/pagination),
>
> См. документацию [здесь](https://frontend.cp.sbercloud.tech/snack/?path=/story/components-pagination-pagination--pagination)

## Installation

`npm i @sbercloud/uikit-product-pagination-private`

## Notes

Нумерация страниц начинается с 1.

## Props

```ts
type PaginationProps = {
  total: number;
  page: number;
  className?: string;
  onChange: (page: number) => void;
};

type PaginationSliderDotsProps = {
  total: number;
  page: number;
  className?: string;
  onChange: (page: number) => void;
};
```
