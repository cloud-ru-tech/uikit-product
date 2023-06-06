import { components as ReactSelectComponents } from 'react-select';

import { StyledSelectContainer } from './styled';

export function SelectContainer({
  className,
  ...restProps
}: React.ComponentProps<typeof ReactSelectComponents.SelectContainer>): JSX.Element {
  return <StyledSelectContainer {...restProps} className={className} />;
}
