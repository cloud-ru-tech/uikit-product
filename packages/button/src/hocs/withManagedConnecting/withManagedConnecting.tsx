import {
  ComponentType,
  FC,
  MouseEventHandler,
  MouseEvent as ReactMouseEvent,
  Ref,
  forwardRef,
  useCallback,
  useState,
} from 'react';

type WithManagedConnectingProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  connecting?: boolean;
};

// https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/#using-forwardref
export const withManagedConnecting = <ComposedComponentProps extends WithManagedConnectingProps>(
  ComposedComponent: ComponentType<ComposedComponentProps>,
) => {
  type ComposedComponentType = typeof ComposedComponent;

  type WrappedComponentProps = ComposedComponentProps & {
    forwardRef: Ref<ComposedComponentType>;
  };

  const WrappedComponent: FC<WrappedComponentProps> = ({ forwardRef, onClick, ...rest }) => {
    const [connecting, setConnecting] = useState(false);

    const wrappedOnClick = useCallback(
      async (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) {
          try {
            setConnecting(true);
            await onClick(e);
          } finally {
            setConnecting(false);
          }
        }
      },
      [onClick],
    );

    return (
      <ComposedComponent
        {...(rest as ComposedComponentProps)}
        ref={forwardRef}
        connecting={connecting}
        onClick={wrappedOnClick}
      />
    );
  };

  return forwardRef<ComposedComponentType, ComposedComponentProps>((props, ref) => (
    <WrappedComponent forwardRef={ref} {...props} />
  ));
};
