import { components as ReactSelectComponents } from 'react-select';
import clsx from 'clsx';

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
    className={clsx(className, optionClass)}
  >
    <StyledTag color={value} />
  </ReactSelectComponents.Option>
);
