import { ComponentType, MouseEvent as ReactMouseEvent, useCallback, useState } from 'react';

import { WithManagedLoadingProps } from '../types';

export const withManagedLoading = <ComposedComponentProps extends WithManagedLoadingProps>(
  ComposedComponent: ComponentType<ComposedComponentProps>,
) =>
  function ({ onClick, ...rest }: ComposedComponentProps) {
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
        loading={loading}
        progress={undefined}
        onClick={wrappedOnClick}
      />
    );
  };
