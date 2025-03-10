# Code Editor

## Installation

`npm i @sbercloud/uikit-product-code-editor`

[Changelog](./CHANGELOG.md)

## Описание

ProductCodeEditor - обертка над компонентом [snack-uikit/CodeEditor](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/snack-uikit/-/tree/master/packages/code-editor?ref_type=heads).

## Назначение

CodeEditor использует для своей работы `monaco-editor`, который передается синхронно. Если его не передать самостоятельно, то он попробует скачать его с внешнего `cdn`.

`monaco-editor` и все его плагины, которые требуются в продукте, настроен в единственном месте - [container](https://git.sbercloud.tech/cp/front/container). Текущий пакет знает об этом месте и может в режиме `async` скачать `monaco-editor` и установить его для `snack-uikit/CodeEditor`

## Использование

Список того, что экспортирует пакет:

1. **AsyncProductCodeEditor**

Async функция, которая вернет `lazy` совместимый компонент. Использование

```tsx
import { Suspense, lazy } from 'react';
import { AsyncProductCodeEditor } from '@sbercloud/uikit-product-code-editor';

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
import { LazyProductCodeEditor, type LazyProductCodeEditorProps } from '@sbercloud/uikit-product-code-editor';

const MyComponent = (props: LazyProductCodeEditorProps) => {
  return <LazyProductCodeEditor {...props} />;
};
```

3. **preloadMonacoEditor**

Async функция, которая выполнит предзагрузку `monaco-editor` браузером, если известно, что он потребуется
