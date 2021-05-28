import { FC } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';

import { StyledTextareaAutosize } from './styled';

export interface ITextareaProps extends TextareaAutosizeProps {
  className?: string;
}

export const Textarea: FC<ITextareaProps> = ({ className, ...props }) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <StyledTextareaAutosize minRows={2} className={className} {...props} />
);
