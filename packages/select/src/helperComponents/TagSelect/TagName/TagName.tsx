import { Tag, TagProps } from '@sbercloud/uikit-react-tag';

import { StyledTag, tagInputClassName } from './styled';

interface TagNameProps {
  editableTagName: boolean;
  tag: {
    label: TagProps['value'];
    color: TagProps['color'];
  };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TagName: React.FC<TagNameProps> = ({ tag, editableTagName, onChange }) => {
  if (editableTagName) {
    return (
      <StyledTag
        value={tag.label}
        color={tag.color}
        inputRef={(ref): void => {
          ref?.focus();
        }}
        type={Tag.types.Input}
        inputClassNames={tagInputClassName}
        onChange={onChange}
      />
    );
  }

  return <Tag value={tag.label} color={tag.color} />;
};
