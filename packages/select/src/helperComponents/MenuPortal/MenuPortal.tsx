import { ComponentProps, forwardRef } from 'react';
import { components as ReactSelectComponents } from 'react-select';

export type RCMenuPortal = ComponentProps<typeof ReactSelectComponents.MenuPortal>;

export const MenuPortal = forwardRef<HTMLDivElement, RCMenuPortal>(
  ({ children, ...restProps }: RCMenuPortal, ref): JSX.Element => (
    <ReactSelectComponents.MenuPortal {...restProps}>
      <div ref={ref}>{children}</div>
    </ReactSelectComponents.MenuPortal>
  ),
);
