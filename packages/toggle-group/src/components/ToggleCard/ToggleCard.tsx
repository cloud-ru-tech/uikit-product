import { ReactElement } from 'react';

import { WithSupportProps, extractSupportProps } from '@sbercloud/uikit-product-utils';

import { ToggleCardBoxControl, ToggleCardBoxIcon } from '../../helperComponents';
import { Value } from '../../types';
import { Alignment } from './constants';
import { Box, Description, Text, Title } from './styled';

export type ToggleCardProps = WithSupportProps<{
  value: Value;
  title: string;
  icon?: ReactElement | boolean | null;
  description?: string;
  className?: string;
  disabled?: boolean;
  alignment?: Alignment;
}>;

export function ToggleCard({
  value,
  title,
  icon,
  description,
  className,
  disabled,
  alignment = Alignment.Start,
  ...rest
}: ToggleCardProps) {
  return (
    <ToggleCardBoxControl value={value} disabled={disabled} className={className} {...extractSupportProps(rest)}>
      <Box data-alignment={alignment}>
        {icon && <ToggleCardBoxIcon data-test-id='toggle-card-icon'>{icon}</ToggleCardBoxIcon>}
        <Text>
          <Title data-test-id='toggle-card-title'>{title}</Title>
          {description && <Description data-test-id='toggle-card-description'>{description}</Description>}
        </Text>
      </Box>
    </ToggleCardBoxControl>
  );
}

ToggleCard.alignment = Alignment;
