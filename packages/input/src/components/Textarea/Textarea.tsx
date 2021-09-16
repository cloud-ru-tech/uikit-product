import { cx } from '@linaria/core';
import { FC } from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

import { textareaAutosizeClassName } from './styled';

export interface ITextareaProps extends TextareaAutosizeProps {
  className?: string;
}

export const Textarea: FC<ITextareaProps> = ({ className, ...props }) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <TextareaAutosize minRows={2} className={cx(textareaAutosizeClassName, className)} {...props} />
);
