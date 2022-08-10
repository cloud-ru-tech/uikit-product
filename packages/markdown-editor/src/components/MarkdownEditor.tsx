import { cx } from '@linaria/core';
import { ChangeEvent } from 'react';
import ReactMarkdown, { Options as ReactMarkdownOptions } from 'react-markdown';
import gfm from 'remark-gfm';

import { SimpleTextarea } from '@sbercloud/uikit-product-textarea-private';
import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { MarkdownEditorMode } from './constants';
import * as S from './styled';

export type MarkdownEditorProps = {
  value: string;
  mode: MarkdownEditorMode;
  onChange(value: string, e?: ChangeEvent<HTMLTextAreaElement>): void;
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
  remarkPlugins = [gfm],
  rehypePlugins = [],
  components = {},
  skipHtml = true,
  ...rest
}: WithSupportProps<MarkdownEditorProps>) {
  if (mode === MarkdownEditorMode.Edit) {
    return (
      <SimpleTextarea
        value={value}
        className={className}
        onChange={onChange}
        autosize={false}
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
        components={components}
        skipHtml={skipHtml}
        className={cx(S.markdownViewerClassName, className)}
      >
        {value}
      </ReactMarkdown>
    </S.MarkdownViewerWrapper>
  );
}
MarkdownEditor.modes = MarkdownEditorMode;
