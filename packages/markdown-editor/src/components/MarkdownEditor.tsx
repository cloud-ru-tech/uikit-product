import { cx } from '@linaria/core';
import { ChangeEvent, useState } from 'react';
import ReactMarkdown, { Options as ReactMarkdownOptions } from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { SimpleTextarea } from '@sbercloud/uikit-product-textarea-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';
import { Divider } from '@snack-uikit/divider';

import { Blockquote } from './Blockquote';
import { Code } from './Code';
import { MarkdownEditorMode } from './constants';
import { Link } from './Link';
import * as S from './styled';
import { Table } from './Table';

export type MarkdownEditorProps = {
  value: string;
  mode: MarkdownEditorMode;
  onChange?(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
  placeholder?: string;
  className?: string;
  remarkPlugins?: ReactMarkdownOptions['remarkPlugins'];
  rehypePlugins?: ReactMarkdownOptions['rehypePlugins'];
  components?: ReactMarkdownOptions['components'];
  skipHtml?: boolean;
};

export function MarkdownEditor({
  value,
  mode,
  onChange,
  placeholder,
  className,
  remarkPlugins = [remarkGfm],
  rehypePlugins = [],
  components = {},
  skipHtml = true,
  ...rest
}: WithSupportProps<MarkdownEditorProps>) {
  const [text, setText] = useState(value);

  const handleChange = (val: string) => {
    setText(val);
    onChange?.(val);
  };

  if (mode === MarkdownEditorMode.Edit) {
    return (
      <SimpleTextarea
        value={text}
        className={className}
        onChange={handleChange}
        autosize={false}
        withClearButton={false}
        placeholder={placeholder}
        {...rest}
      />
    );
  }

  return (
    <S.MarkdownViewerWrapper {...extractSupportProps(rest)}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        skipHtml={skipHtml}
        className={cx(S.markdownViewerClassName, className)}
        components={{
          code: Code,
          table: Table,
          hr: Divider,
          blockquote: Blockquote,
          a: Link,
          ...components,
        }}
      >
        {value}
      </ReactMarkdown>
    </S.MarkdownViewerWrapper>
  );
}

MarkdownEditor.modes = MarkdownEditorMode;
