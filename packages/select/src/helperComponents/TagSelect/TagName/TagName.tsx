import { Tag, TagProps } from '@sbercloud/uikit-product-tag';

type TagNameProps = {
  tag: {
    label: TagProps['value'];
    color: TagProps['color'];
  };
};

export function TagName({ tag }: TagNameProps) {
  return <Tag value={tag.label} color={tag.color} />;
}
