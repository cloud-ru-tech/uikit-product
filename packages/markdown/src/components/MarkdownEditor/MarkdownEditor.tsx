import {
  MarkdownEditor as MarkdownEditorDefault,
  MarkdownEditorProps as MarkdownEditorPropsDefault,
} from '@snack-uikit/markdown';

import { Code } from '../../helperComponents';

export type MarkdownEditorProps = Omit<MarkdownEditorPropsDefault, 'components'>;

export function MarkdownEditor({ onCodeCopyClick, ...rest }: MarkdownEditorProps) {
  return (
    <MarkdownEditorDefault
      {...rest}
      components={{ code: props => <Code {...props} onCopyClick={onCodeCopyClick} /> }}
    />
  );
}
