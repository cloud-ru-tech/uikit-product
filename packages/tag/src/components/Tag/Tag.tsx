import { ButtonIcon } from '@sbercloud/uikit-react-button';
import { CloseInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { extractSupportProps } from '@sbercloud/uikit-utils';

import { Colors, Sizes } from '../../constants';
import { RemoveButton, Text, styledTag } from './styled';
import { TagProps } from './types';

function StylelessTag({ color, value, className, size = Sizes.Small, onRemoveClick, ...rest }: TagProps) {
  const removable = Boolean(onRemoveClick);

  return (
    <span
      className={className}
      data-color={color}
      data-size={size}
      data-removable={removable || undefined}
      {...extractSupportProps(rest)}
    >
      <Text data-test-id='tag-text'>{value}</Text>
      {removable && (
        <RemoveButton
          icon={<CloseInterfaceSVG />}
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
