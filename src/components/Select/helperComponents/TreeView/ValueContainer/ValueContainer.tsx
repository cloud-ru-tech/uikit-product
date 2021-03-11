import { ValueContainerProps } from 'react-select';

import { IOptionProps } from 'components/Select/helperComponents/TreeView/Menu';

import { StyledContainer } from './styled';

export const ValueContainer: React.FC<
  ValueContainerProps<IOptionProps, false>
> = ({ selectProps: { placeholder } }) => (
  <StyledContainer>{placeholder}</StyledContainer>
);
