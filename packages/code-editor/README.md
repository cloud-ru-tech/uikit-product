# Code Editor

## Installation

`npm i @cloud-ru/uikit-product-code-editor`

[Changelog](./CHANGELOG.md)

## Описание

ProductCodeEditor - обертка над компонентом [snack-uikit/CodeEditor](https://github.com/cloud-ru-tech/snack-uikit/tree/master/packages/code-editor).

## Назначение

CodeEditor использует для своей работы `monaco-editor`, который передается синхронно. Если его не передать самостоятельно, то он попробует скачать его с внешнего `cdn`.

`monaco-editor` и все его плагины, которые требуются в продукте, настроен в единственном месте - `container`. Текущий пакет знает об этом месте и может в режиме `async` скачать `monaco-editor` и установить его для `snack-uikit/CodeEditor`

## Использование

Список того, что экспортирует пакет:

1. **AsyncProductCodeEditor**

Async функция, которая вернет `lazy` совместимый компонент. Использование

```tsx
import { Suspense, lazy } from 'react';
import { AsyncProductCodeEditor } from '@cloud-ru/uikit-product-code-editor';

const Editor = lazy(() => AsyncProductCodeEditor());

const MyComponent = () => {
  return (
    <Suspense
      fallback='loading...' // установить свой лоадер
    >
      <Editor language='json' value='' />
    </Suspense>
  );
};
```

2. **LazyProductCodeEditor**

Готовый пресет, который сам обернет `snack-uikit/CodeEditor` в `Suspense` и выполнит `lazy`

```tsx
import { LazyProductCodeEditor, type LazyProductCodeEditorProps } from '@cloud-ru/uikit-product-code-editor';

const MyComponent = (props: LazyProductCodeEditorProps) => {
  return <LazyProductCodeEditor {...props} />;
};
```

3. **preloadMonacoEditor**

Async функция, которая выполнит предзагрузку `monaco-editor` браузером, если известно, что он потребуется.

```tsx
const monaco = await preloadMonacoEditor();
```
