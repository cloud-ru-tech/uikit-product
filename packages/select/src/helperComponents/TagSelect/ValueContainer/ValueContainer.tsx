import { components as ReactSelectComponents } from 'react-select';

import { Tag } from '@sbercloud/uikit-product-tag';

export const ValueContainer = ({
  hasValue,
  getValue,
}: React.ComponentProps<typeof ReactSelectComponents.ValueContainer>): JSX.Element | null => {
  if (!hasValue) {
    return <div />;
  }

  const data = getValue()[0];

  return <Tag color={data.color} value={data.label} />;
};
