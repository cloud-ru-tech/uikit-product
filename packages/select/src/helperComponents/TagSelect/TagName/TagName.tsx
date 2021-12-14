import { Tag, TagProps } from '@sbercloud/uikit-react-tag';

interface TagNameProps {
  tag: {
    label: TagProps['value'];
    color: TagProps['color'];
  };
}

export const TagName: React.FC<TagNameProps> = ({ tag }) => <Tag value={tag.label} color={tag.color} />;
