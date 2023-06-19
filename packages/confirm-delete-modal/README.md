# Confirm Delete Modal

Модальное окно для удаление основных продуктовых сущностей.

Требует ввести название сущности для подтверждения.

## Installation
`npm i @sbercloud/uikit-product-confirm-delete-modal`

## Props
```typescript
type ConfirmDeleteModalProps = Pick<ModalProps, 'isOpen' | 'title' | 'onClose' | 'align'> & {
  target: {
    name: string;
    value: string;
  };
  onApprove: (fields: { name }) => void;
};
```

[Changelog](./CHANGELOG.md)


