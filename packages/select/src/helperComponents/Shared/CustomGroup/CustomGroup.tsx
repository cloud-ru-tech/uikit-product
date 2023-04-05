import { FC, useState } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { SelectProps } from '../../../components';

const Group: FC<
  React.ComponentProps<typeof ReactSelectComponents.Group> & {
    data?: { open?: boolean };
  }
> = props => {
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
};

export const CustomGroup = (props: SelectProps): typeof ReactSelectComponents.GroupHeading => {
  const { collapsedGroup } = props;

  if (!collapsedGroup) {
    return (data: React.ComponentProps<typeof ReactSelectComponents.Group>): JSX.Element => (
      <ReactSelectComponents.Group {...data} />
    );
  }

  return Group;
};
