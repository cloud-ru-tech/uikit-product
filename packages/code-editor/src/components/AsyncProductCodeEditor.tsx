import { ComponentType } from 'react';

import { loadMonacoEditor } from './loader';
import { ProductCodeEditorProps } from './types';
import { withMonaco } from './withMonaco';

/**
 * CodeEditor с загруженным 'monaco-editor'
 *
 * @example Пример использования
 * ```tsx
 * import { Suspense, lazy } from 'react'
 * import { AsyncProductCodeEditor } from ''
 *
 *  const Editor = lazy(() => AsyncProductCodeEditor())
 *
 *  const MyComponent = () => {
 *   return <Suspense fallback='loading...'>
 *     <Editor language='json' value="" />
 *   </Suspense>
 *  }
 *
 * ```
 */
export const AsyncProductCodeEditor: () => Promise<{ default: ComponentType<ProductCodeEditorProps> }> = async () => {
  const monaco = await loadMonacoEditor();
  if (monaco) {
    return { default: withMonaco(monaco).CodeEditor };
  }
  return { default: withMonaco().CodeEditor };
};
