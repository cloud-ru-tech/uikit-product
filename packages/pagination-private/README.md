# React Pagination Private

## Installation

`npm i @sbercloud/uikit-react-pagination-private`

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
