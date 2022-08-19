import { useState } from 'react';

import { ButtonIcon } from '@sbercloud/uikit-product-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Tooltip } from '@sbercloud/uikit-product-tooltip';
import { extractSupportProps } from '@sbercloud/uikit-product-utils';

import { Colors, Sizes } from '../../constants';
import { isOverflown } from './helpers';
import { RemoveButton, styledTag, Text } from './styled';
import { TagProps } from './types';

const ICON_SIZES: Record<Sizes, number> = {
  [Sizes.Small]: 16,
  [Sizes.Medium]: 20,
};

function StylelessTag({ color, value, className, size = Sizes.Small, onRemoveClick, ...rest }: TagProps) {
  const removable = Boolean(onRemoveClick);
  const [isTextOverflown, setIsTextOverflown] = useState(false);

  function setText(text: HTMLElement | null) {
    setIsTextOverflown(isOverflown(text));
  }

  return (
    <span
      className={className}
      data-color={color}
      data-size={size}
      data-removable={removable || undefined}
      {...extractSupportProps(rest)}
    >
      {isTextOverflown ? (
        <Tooltip title={String(value)} trigger={Tooltip.triggers.Hover}>
          <Text ref={setText} data-test-id='tag-text'>
            {value}
          </Text>
        </Tooltip>
      ) : (
        <Text ref={setText} data-test-id='tag-text'>
          {value}
        </Text>
      )}

      {removable && (
        <RemoveButton
          icon={<CloseInterfaceSVG size={ICON_SIZES[size]} />}
          variant={ButtonIcon.variants.Strong}
          onClick={onRemoveClick}
          data-test-id='tag-remove-button'
        />
      )}
    </span>
  );
}

const StyledTag = styledTag(StylelessTag);

export type { TagProps };

export const Tag = StyledTag as typeof StyledTag & {
  sizes: typeof Sizes;
  colors: typeof Colors;
};

Tag.sizes = Sizes;
Tag.colors = Colors;
