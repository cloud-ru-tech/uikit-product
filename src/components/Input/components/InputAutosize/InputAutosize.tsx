import { FC } from 'react';
import RCAutosizeInput, { AutosizeInputProps } from 'react-input-autosize';

import { inputClassname } from './styled';

export interface IAutosizeInputProps extends AutosizeInputProps {}

export const InputAutosize: FC<IAutosizeInputProps> = props => (
  // TODO: check type error
  <RCAutosizeInput inputClassName={inputClassname} {...props} />
);
