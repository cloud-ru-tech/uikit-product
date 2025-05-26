import { Markdown as MarkdownDefault, MarkdownProps as MarkdownPropsDefault } from '@snack-uikit/markdown';

import { Code } from '../../helperComponents';

export type MarkdownProps = Omit<MarkdownPropsDefault, 'components'>;

export function Markdown({ onCopyClick, ...rest }: MarkdownProps) {
  return <MarkdownDefault {...rest} components={{ code: props => <Code {...props} onCopyClick={onCopyClick} /> }} />;
}
