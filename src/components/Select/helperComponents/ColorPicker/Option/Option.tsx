import { components as ReactSelectComponents } from 'react-select';
import { cx } from '@linaria/core';

import { StyledTag, optionClass } from './styled';

export const Option = ({
  data,
  className,
  data: { value },
  ...restProps
}: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element => (
  <ReactSelectComponents.Option
    {...restProps}
    data={data}
    className={cx(className, optionClass)}
  >
    <StyledTag color={value} />
  </ReactSelectComponents.Option>
);
