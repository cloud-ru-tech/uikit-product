import { FC } from 'react';
import RCAutosizeInput, { AutosizeInputProps } from 'react-input-autosize';

import { inputClassname } from './styled';

export type IAutosizeInputProps = Omit<AutosizeInputProps, 'ref'>;

export const InputAutosize: FC<IAutosizeInputProps> = props => (
  <RCAutosizeInput inputClassName={inputClassname} {...props} />
);
