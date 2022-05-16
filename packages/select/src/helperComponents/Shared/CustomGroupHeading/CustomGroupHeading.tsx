import { components as ReactSelectComponents } from 'react-select';

import { DropdownDownInterfaceSVG } from '@sbercloud/uikit-product-icons';

import { ISelectProps } from '../../../components';
import { arrowClass } from './styled';

interface GroupHeadingProps<CustomOptionType> extends React.ComponentProps<typeof ReactSelectComponents.GroupHeading> {
  custom?: {
    open?: boolean;
    setOpen?: (open?: boolean) => void;
    selectProps?: ISelectProps<CustomOptionType>;
  };
}

export const CustomGroupHeading = <CustomOptionType,>(
  props: ISelectProps<CustomOptionType>,
): typeof ReactSelectComponents.GroupHeading => {
  const { collapsedGroup } = props;

  if (!collapsedGroup) {
    return (data: React.ComponentProps<typeof ReactSelectComponents.GroupHeading>): JSX.Element => (
      <ReactSelectComponents.GroupHeading {...data} />
    );
  }

  return ({ custom, children, getStyles, ...props }: GroupHeadingProps<CustomOptionType>): JSX.Element => {
    const { open, setOpen, selectProps } = custom || {};
    return (
      <ReactSelectComponents.GroupHeading
        {...props}
        getStyles={(key: string, props: GroupHeadingProps<CustomOptionType>) =>
          getStyles(key, { ...props, selectProps })
        }
        onClick={() => setOpen?.(!open)}
      >
        <DropdownDownInterfaceSVG className={arrowClass} data-open={open || undefined} />
        {children}
      </ReactSelectComponents.GroupHeading>
    );
  };
};
