import { ComponentProps, useState } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { SelectProps } from '../../../components';

function Group(
  props: ComponentProps<typeof ReactSelectComponents.Group> & {
    data?: { open?: boolean };
  },
) {
  const { children, headingProps, options, data, getValue, selectProps } = props;
  const selected = getValue();
  const someSelected = selected?.length && options.some(option => selected.indexOf(option.data) !== -1);

  const [open, setOpen] = useState(data?.open || someSelected);

  return (
    <ReactSelectComponents.Group
      {...props}
      headingProps={{
        ...(headingProps || {}),
        custom: {
          open,
          setOpen,
          selectProps,
        },
      }}
    >
      {open ? children : null}
    </ReactSelectComponents.Group>
  );
}

export const CustomGroup = (props: SelectProps): typeof ReactSelectComponents.GroupHeading => {
  const { collapsedGroup } = props;

  if (!collapsedGroup) {
    return function (data: React.ComponentProps<typeof ReactSelectComponents.Group>): JSX.Element {
      return <ReactSelectComponents.Group {...data} />;
    };
  }

  return Group;
};
