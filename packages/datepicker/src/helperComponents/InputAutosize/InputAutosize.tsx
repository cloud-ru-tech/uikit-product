import RCAutosizeInput, { AutosizeInputProps as RIAProps } from 'react-input-autosize';

import { inputClassname } from './styled';

export type AutosizeInputProps = Omit<RIAProps, 'ref'>;

export function InputAutosize(props: AutosizeInputProps) {
  return <RCAutosizeInput inputClassName={inputClassname} {...props} />;
}
