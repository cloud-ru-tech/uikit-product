# React Text Field

## Installation

`npm i @sbercloud/uikit-product-text-field`

## Props

```typescript
type TextFieldProps = {
  className?: string;
  type?: Types;
  text: string;
  extraIcons?: ReactNode;
  allowCopy?: boolean;
  size?: Size;
  /** Необходимо для тех случаев, когда скрытое поле хранится на бэке и
   *  нужно делать запрос для получения его значения.
   *  возвращаем preventAction если произошла ошибка и не хотим триггерить копирование или просмотр
   *  возвращаем text если хотим копировать значение, только что прилетевшее с бэка
   */
  onRequestSecuredField?: () => Promise<{ text?: string; preventAction?: boolean } | undefined>;
};

enum Types {
  OneLine = 'OneLine',
  MultiLine = 'MultiLine',
  Password = 'Password',
}

enum Size {
  Medium = 'Medium',
  Large = 'Large',
}
```
