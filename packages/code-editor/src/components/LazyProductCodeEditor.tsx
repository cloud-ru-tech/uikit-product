import { lazy, Suspense } from 'react';

import { Spinner } from '@snack-uikit/loaders';

import { AsyncProductCodeEditor } from './AsyncProductCodeEditor';
import { ProductCodeEditorProps } from './types';

const CodeEditor = lazy(() => AsyncProductCodeEditor());

export type LazyProductCodeEditorProps = ProductCodeEditorProps;

function Loader(props: { height?: number | string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: props.height,
      }}
    >
      <Spinner />
    </div>
  );
}

/**
 * Готовый preset
 *
 * @example Пример использования
 * ```tsx
 * import { LazyProductCodeEditor } from ''
 *
 *  const MyComponent = () => {
 *   return <LazyProductCodeEditor />
 *  }
 * ```
 * `LazyProductCodeEditor` работает как:
 *
 * @example
 * ```tsx
 *  const Editor = lazy(() => AsyncMonacoCodeEditor())
 *
 *  const LazyProductCodeEditor = (props: CodeEditorProps) => {
 *   <Suspense fallback={<snack-uikit-spinner height={props.height} />}>
 *     <Editor {...props}/>
 *   </Suspense>
 *  }
 * ````
 */
export function LazyProductCodeEditor(props: LazyProductCodeEditorProps) {
  const { height } = props;

  return (
    <Suspense fallback={<Loader height={height} />}>
      <CodeEditor {...props} />
    </Suspense>
  );
}
