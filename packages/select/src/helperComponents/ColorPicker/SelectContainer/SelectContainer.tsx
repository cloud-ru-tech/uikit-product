import { components as ReactSelectComponents } from 'react-select';

import { StyledSelectContainer } from './styled';

export const SelectContainer = ({
  className,
  ...restProps
}: React.ComponentProps<typeof ReactSelectComponents.SelectContainer>): JSX.Element => (
  <StyledSelectContainer {...restProps} className={className} />
);
