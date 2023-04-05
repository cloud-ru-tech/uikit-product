import { components as ReactSelectComponents } from 'react-select';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { SelectProps } from '../../../components';
import { arrowClass } from './styled';

type GroupHeadingProps = {
  custom?: {
    open?: boolean;
    setOpen?: (open?: boolean) => void;
    selectProps?: SelectProps;
  };
} & React.ComponentProps<typeof ReactSelectComponents.GroupHeading>;

export const CustomGroupHeading = (props: SelectProps): typeof ReactSelectComponents.GroupHeading => {
  const { collapsedGroup } = props;

  if (!collapsedGroup) {
    return (data: React.ComponentProps<typeof ReactSelectComponents.GroupHeading>): JSX.Element => (
      <ReactSelectComponents.GroupHeading {...data} />
    );
  }

  return ({ custom, children, getStyles, ...props }: GroupHeadingProps): JSX.Element => {
    const { open, setOpen, selectProps } = custom || {};
    return (
      <ReactSelectComponents.GroupHeading
        {...props}
        getStyles={(key: string, props: GroupHeadingProps) => getStyles(key, { ...props, selectProps })}
        onClick={() => setOpen?.(!open)}
      >
        <DropdownDownInterfaceSVG className={arrowClass} data-open={open || undefined} />
        {children}
      </ReactSelectComponents.GroupHeading>
    );
  };
};
