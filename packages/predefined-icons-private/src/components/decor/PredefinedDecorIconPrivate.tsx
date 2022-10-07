import { cloneElement, ReactElement } from 'react';

import { extractSupportProps, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { Icon } from '../../constants';
import { PredefinedIcon } from '../../helperComponents';
import { notReachable } from '../../helpers';
import { PredefinedDecorIconType, Sizes, SIZES_IN_PX } from './constants';
import { Wrapper } from './styled';

type CommonPredefinedDecorIconProps = WithSupportProps<{
  size?: Sizes;
  className?: string;
}>;

export type PredefinedDecorIconProps = CommonPredefinedDecorIconProps & {
  type: PredefinedDecorIconType.Predefined;
  icon: Icon;
};

export type DecorIconProps = CommonPredefinedDecorIconProps & {
  type: PredefinedDecorIconType.Custom;
  icon: ReactElement<{ size?: string | number }>;
};

export type PredefinedDecorIconPrivateProps = PredefinedDecorIconProps | DecorIconProps;

const getContent = (props: PredefinedDecorIconPrivateProps) => {
  const { size = Sizes.Medium } = props;
  const { iconSize } = SIZES_IN_PX[size];

  switch (props.type) {
    case PredefinedDecorIconType.Predefined:
      return {
        icon: <PredefinedIcon icon={props.icon} size={iconSize} />,
        dataIcon: props.icon,
      };
    case PredefinedDecorIconType.Custom:
      return {
        icon: cloneElement(props.icon, { size: iconSize }),
        dataIcon: undefined,
      };

    default:
      notReachable(props);
      return {
        icon: null,
        dataIcon: undefined,
      };
  }
};

export function PredefinedDecorIconPrivate(props: PredefinedDecorIconPrivateProps) {
  const { type, size = Sizes.Medium, className, ...rest } = props;
  const { icon, dataIcon } = getContent(props);

  return (
    <Wrapper
      className={className}
      data-type={type}
      data-size={size}
      data-icon={dataIcon}
      {...extractSupportProps(rest)}
    >
      {icon}
    </Wrapper>
  );
}

PredefinedDecorIconPrivate.sizes = Sizes;
PredefinedDecorIconPrivate.icons = Icon;
PredefinedDecorIconPrivate.types = PredefinedDecorIconType;
