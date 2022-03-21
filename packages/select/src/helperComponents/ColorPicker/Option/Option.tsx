import { cx } from '@linaria/core';
import { components as ReactSelectComponents } from 'react-select';

import { StyledColorBox, optionClass } from './styled';

export const Option = ({
  data,
  className,
  data: { value },
  ...restProps
}: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element => (
  <ReactSelectComponents.Option {...restProps} data={data} className={cx(className, optionClass)}>
    <StyledColorBox color={value} />
  </ReactSelectComponents.Option>
);
