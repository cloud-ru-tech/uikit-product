import { ComponentType, FC, Ref, forwardRef } from 'react';

import { Tooltip, TooltipProps } from '@sbercloud/uikit-react-tooltip';

import { CommonButtonProps } from '../types';

export type WithTooltipProps = {
  className?: CommonButtonProps['className'];
  tooltip?: TooltipProps['tooltip'];
  disabledTooltip?: TooltipProps['tooltip'];
  tooltipPlacement?: TooltipProps['placement'];
};

// https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/#using-forwardref
export const withTooltip = <ComposedComponentProps extends Pick<CommonButtonProps, 'disabled'> & { title?: unknown }>(
  ComposedComponent: ComponentType<ComposedComponentProps>,
) => {
  type ComposedComponentType = typeof ComposedComponent;

  type WrapperComponentProps = ComposedComponentProps & WithTooltipProps;
  type WrapperComponentPropsWithForwardedRef = WrapperComponentProps & {
    forwardRef: Ref<ComposedComponentType>;
  };

  const WrappedComponent: FC<WrapperComponentPropsWithForwardedRef> = ({
    forwardRef,
    tooltip,
    disabledTooltip,
    tooltipPlacement = Tooltip.placements.BottomStart,
    // т.к. основное назначение className это позиционирование,
    // а в случае с Tooltip над ComposedComponent есть обертка trigger,
    // то className проставляем в classNameTrigger
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    title, // чтобы не пробрасывался нативный вариант
    ...rest
  }) =>
    tooltip ? (
      <Tooltip
        tooltip={rest.disabled ? disabledTooltip || tooltip : tooltip}
        delayShow={1500}
        placement={tooltipPlacement}
        classNameTrigger={className}
      >
        <ComposedComponent {...(rest as ComposedComponentProps)} ref={forwardRef} />
      </Tooltip>
    ) : (
      <ComposedComponent {...(rest as ComposedComponentProps)} className={className} ref={forwardRef} />
    );

  const ForwardedComponent = forwardRef<ComposedComponentType, WrapperComponentProps>((props, ref) => (
    <WrappedComponent forwardRef={ref} {...props} />
  ));

  const ForwardedComponentWithStatic = ForwardedComponent as typeof ForwardedComponent & {
    placements: typeof Tooltip.placements;
  };

  ForwardedComponentWithStatic.placements = Tooltip.placements;

  return ForwardedComponentWithStatic;
};
