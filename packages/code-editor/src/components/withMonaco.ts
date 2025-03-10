import { CodeEditor, loader } from '@snack-uikit/code-editor';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withMonaco = (monaco?: any) => {
  if (monaco) {
    loader.config({ monaco });
  }
  return {
    CodeEditor,
  };
};
