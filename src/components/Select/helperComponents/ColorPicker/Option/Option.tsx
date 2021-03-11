import { components as ReactSelectComponents } from 'react-select';

import { StyledTag, StyledOption } from './styled';

export const Option = ({
  data,
  className,
  data: { value },
  ...restProps
}: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element => (
  <StyledOption {...restProps} data={data} className={className}>
    <StyledTag color={value} />
  </StyledOption>
);
