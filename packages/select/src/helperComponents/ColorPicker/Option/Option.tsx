import { cx } from '@linaria/core';
import { components as ReactSelectComponents } from 'react-select';

import { optionClass, StyledColorBox } from './styled';

export function Option({
  data,
  className,
  data: { value },
  ...restProps
}: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element {
  return (
    <ReactSelectComponents.Option {...restProps} data={data} className={cx(className, optionClass)}>
      <StyledColorBox color={value} />
    </ReactSelectComponents.Option>
  );
}
