import { ReactElement, cloneElement } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { ToggleCardBoxControl, ToggleCardBoxIcon } from '../../helperComponents';
import { Value } from '../../types';
import { Box, Title } from './styled';

export type ToggleCardDisplayProps = WithSupportProps<{
  value: Value;
  title: string;
  icon: ReactElement<{ size?: string | number }>;
  className?: string;
  disabled?: boolean;
}>;

export function ToggleCardDisplay({ value, title, icon, className, disabled, ...rest }: ToggleCardDisplayProps) {
  return (
    <ToggleCardBoxControl value={value} className={className} disabled={disabled} {...extractSupportProps(rest)}>
      <Box>
        <ToggleCardBoxIcon data-test-id='toggle-card-display-icon'>
          {cloneElement(icon, { size: 32 })}
        </ToggleCardBoxIcon>
        <Title data-test-id='toggle-card-display-title'>{title}</Title>
      </Box>
    </ToggleCardBoxControl>
  );
}
