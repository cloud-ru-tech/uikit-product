import { memo, MouseEvent as ReactMouseEvent } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { SelectProps } from '../../../components';

const Stub = (): JSX.Element => <></>;

function withStopPropagation(callback: () => void) {
  return function (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    callback();
  };
}

export const CustomControl = (props: SelectProps): typeof ReactSelectComponents.Control => {
  const { prefixControl } = props;

  if (!prefixControl) {
    return (data: React.ComponentProps<typeof ReactSelectComponents.Control>): JSX.Element => {
      const {
        selectProps: { toggleMenu },
      } = data;

      return (
        <div role='presentation' onClick={withStopPropagation(toggleMenu)}>
          <ReactSelectComponents.Control {...data} />
        </div>
      );
    };
  }

  const PrefixControlComponent = prefixControl ? memo(prefixControl) : Stub;

  return (data: React.ComponentProps<typeof ReactSelectComponents.Control>): JSX.Element => {
    const {
      children,
      selectProps: { toggleMenu },
    } = data;

    return (
      <div role='presentation' onClick={withStopPropagation(toggleMenu)}>
        <ReactSelectComponents.Control {...data}>
          <PrefixControlComponent {...data} />
          {children}
        </ReactSelectComponents.Control>
      </div>
    );
  };
};
