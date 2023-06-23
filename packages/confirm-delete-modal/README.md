# Confirm Delete Modal

Модальное окно для удаления основных продуктовых сущностей.

Требует ввести название сущности для подтверждения.

## Installation
`npm i @sbercloud/uikit-product-confirm-delete-modal`

## Props
```typescript
type ConfirmDeleteModalProps = Pick<ModalProps, 'isOpen' | 'title' | 'onClose'> & {
  target: {
    name: string;
    value: string;
  };
  onApprove: VoidFunction;
};
```

[Changelog](./CHANGELOG.md)


