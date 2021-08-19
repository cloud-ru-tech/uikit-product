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

type WithManagedLoadingProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
};

// https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/#using-forwardref
export const withManagedLoading = <ComposedComponentProps extends WithManagedLoadingProps>(
  ComposedComponent: ComponentType<ComposedComponentProps>,
) => {
  type ComposedComponentType = typeof ComposedComponent;

  type WrappedComponentProps = ComposedComponentProps & {
    forwardRef: Ref<ComposedComponentType>;
  };

  const WrappedComponent: FC<WrappedComponentProps> = ({ forwardRef, onClick, ...rest }) => {
    const [loading, setLoading] = useState(false);

    const wrappedOnClick = useCallback(
      async (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) {
          try {
            setLoading(true);
            await onClick(e);
          } finally {
            setLoading(false);
          }
        }
      },
      [onClick],
    );

    return (
      <ComposedComponent
        {...(rest as ComposedComponentProps)}
        ref={forwardRef}
        loading={loading}
        progress={undefined}
        onClick={wrappedOnClick}
      />
    );
  };

  return forwardRef<ComposedComponentType, ComposedComponentProps>((props, ref) => (
    <WrappedComponent forwardRef={ref} {...props} />
  ));
};
