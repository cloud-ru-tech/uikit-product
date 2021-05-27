import { cx } from '@linaria/core';
import isEqual from 'lodash.isequal';
import { useEffect, useRef, useState } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { CircleCheckSVG, DeleteSVG, EditSVG } from '@sbercloud/icons';
import { Button } from '@sbercloud/uikit-react-button';
import { Tag } from '@sbercloud/uikit-react-tag';

import { ColorPicker, OptionTypeColor } from '../../../components';
import {
  StyledTag,
  StyledTagButton,
  StyledTagButtonWrapper,
  StyledTagOption,
  StyledTagOptionLabel,
  colorPickerClassName,
  optionClass,
  tagInputClassName,
} from './styled';

export const Option = (props: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element => {
  const {
    data,
    innerRef,
    className,
    selectProps: { onTagChange, approveDeleting, isSelected, colorDropdownPlacement, setMenuListBlockScroll },
  } = props;

  const [isEdit, setEdit] = useState(false);
  const [tag, setTag] = useState(data);
  const [colorVal, setColorVal] = useState({ value: tag.color });

  if (isEdit) {
    props.innerProps.onClick = (e): void => {
      e.stopPropagation();
    };
  } else {
    props.innerProps.onClick = (): void => {
      if (isSelected) {
        props.setValue(data, 'set-value');
      }
    };
  }

  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (props.isSelected) {
      ref?.current?.scrollIntoView({ block: 'nearest' });
    }
    setTag(data);
    setColorVal({ value: data.color });
  }, [data.value]);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    const isOption = event.currentTarget.contains(event.relatedTarget as Node);

    if (!(isOption || props.isFocused)) {
      setEdit(false);
    }
  };

  return (
    <ReactSelectComponents.Option
      {...props}
      className={cx(className, optionClass)}
      innerRef={ref}
      key={tag.value}
      data-is-edit={isEdit}
    >
      <StyledTagOption data-is-edit={isEdit} ref={innerRef} onBlur={handleBlur}>
        {isEdit ? (
          <>
            <StyledTag
              inputRef={(ref): void => {
                ref?.focus();
              }}
              color={tag.color}
              value={tag.label}
              type={Tag.types.Input}
              inputClassNames={tagInputClassName}
              onChange={(e: { target: { value: any } }): void => {
                setTag({ ...tag, label: e.target.value });
              }}
            />
            <StyledTagButtonWrapper>
              <ColorPicker
                dropdownPlacement={colorDropdownPlacement}
                defaultValue={colorVal}
                onChange={(color: OptionTypeColor): void => {
                  setColorVal(color);
                  setTag({ ...tag, color: color.value });
                }}
                menuPosition='fixed'
                onMenuOpen={(): void => {
                  setMenuListBlockScroll(true);
                }}
                onMenuClose={(): void => {
                  setMenuListBlockScroll(false);
                }}
                className={colorPickerClassName}
              />
              <StyledTagButton
                variant={Button.variants.Transparent}
                size={Button.sizes.xs}
                onClick={(): void => {
                  const dataIndex = props.options.indexOf(data);
                  if (dataIndex < 0) return;

                  approveDeleting(data, () => {
                    setEdit(false);
                    const nextTags = [...props.options];
                    nextTags.splice(dataIndex, 1);

                    if (onTagChange) {
                      onTagChange(nextTags, dataIndex, props.options[dataIndex], 'delete');
                    }

                    if (props.isSelected) {
                      props.clearValue();
                    }
                  });
                }}
              >
                <DeleteSVG />
              </StyledTagButton>
              <StyledTagButton
                size={Button.sizes.xs}
                variant={Button.variants.Transparent}
                onClick={(): void => {
                  setEdit(false);
                  if (!isEqual(data, tag) && tag.label) {
                    const dataIndex = props.options.indexOf(data);

                    if (dataIndex < 0) return;
                    const nextTags = [...props.options];
                    nextTags.splice(dataIndex, 1, tag);

                    onTagChange(nextTags, dataIndex, tag, 'edit');
                    if (props.isSelected) {
                      props.setValue(tag, 'set-value');
                    }
                  }
                }}
              >
                <CircleCheckSVG />
              </StyledTagButton>
            </StyledTagButtonWrapper>
          </>
        ) : (
          <>
            <StyledTagOptionLabel color={data.color}>{data.label}</StyledTagOptionLabel>
            <StyledTagButton
              variant={Button.variants.Transparent}
              size={Button.sizes.xs}
              onClick={(e: { stopPropagation: () => void }): void => {
                e.stopPropagation();
                setEdit(true);
              }}
            >
              <EditSVG />
            </StyledTagButton>
          </>
        )}
      </StyledTagOption>
    </ReactSelectComponents.Option>
  );
};
