import { ComponentType } from 'react';

import { Tooltip } from '@sbercloud/uikit-product-tooltip';

import { CommonButtonProps, WithTooltipProps } from '../types';

// https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/#using-forwardref
export const withTooltip = <ComposedComponentProps extends Pick<CommonButtonProps, 'disabled'> & { title?: unknown }>(
  ComposedComponent: ComponentType<ComposedComponentProps>,
) => {
  type WrapperComponentProps = ComposedComponentProps & WithTooltipProps;

  const WrappedComponent = ({
    tooltip,
    disabledTooltip,
    // т.к. основное назначение className это позиционирование,
    // а в случае с Tooltip над ComposedComponent есть обертка trigger,
    // то className проставляем в classNameTrigger
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    title, // чтобы не пробрасывался нативный вариант
    ...rest
  }: WrapperComponentProps) =>
    tooltip || (rest.disabled && disabledTooltip) ? (
      <Tooltip
        {...(rest.disabled ? disabledTooltip || tooltip || {} : tooltip || {})}
        data-test-id={`button-tooltip__${ComposedComponent.displayName}`}
        type={rest.disabled ? Tooltip.types.Instant : Tooltip.types.Tip}
        classNameTrigger={className}
      >
        <ComposedComponent {...(rest as ComposedComponentProps)} />
      </Tooltip>
    ) : (
      <ComposedComponent {...(rest as ComposedComponentProps)} className={className} />
    );

  WrappedComponent.placements = Tooltip.placements;
  return WrappedComponent;
};
