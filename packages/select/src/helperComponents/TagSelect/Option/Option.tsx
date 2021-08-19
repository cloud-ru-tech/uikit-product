import { cx } from '@linaria/core';
import isEqual from 'lodash.isequal';
import { useEffect, useMemo, useRef, useState } from 'react';
import { components as ReactSelectComponents } from 'react-select';

import { CircleCheckOutlineInterfaceSVG, DeleteInterfaceSVG, EditInterfaceSVG } from '@sbercloud/uikit-react-icons';
import { useLanguage } from '@sbercloud/uikit-utils';

import { ColorPicker, OptionTypeColor } from '../../../components';
import { Texts, textProvider } from '../../../helpers/texts-provider';
import { TagName } from '../TagName';
import {
  NotValidMessage,
  StyledTagButton,
  StyledTagButtonWrapper,
  StyledTagOption,
  StyledTagOptionLabel,
  colorPickerClassName,
  optionClass,
} from './styled';

export const Option = (props: React.ComponentProps<typeof ReactSelectComponents.Option>): JSX.Element => {
  const {
    data,
    innerRef,
    className,
    selectProps: {
      onTagChange,
      approveDeleting,
      isSelected,
      colorDropdownPlacement,
      setMenuListBlockScroll,
      editableTagName,
      validator,
      validateMessage,
    },
  } = props;

  const [isEdit, setEdit] = useState(false);
  const [tag, setTag] = useState(data);
  const [colorVal, setColorVal] = useState({ value: tag.color });

  const notValid = useMemo(
    () => editableTagName && validator && !validator(tag.label),
    [validator, tag, editableTagName],
  );

  const { code: language } = useLanguage({ onlyEnabledLanguage: true });

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
            <TagName
              tag={tag}
              editableTagName={editableTagName}
              onChange={(e: { target: { value: string } }) => {
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
                icon={<DeleteInterfaceSVG />}
                tooltip={textProvider(language, Texts.delete)}
              />

              <StyledTagButton
                data-disabled={notValid || undefined}
                onClick={(): void => {
                  if (notValid) return;
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
                icon={<CircleCheckOutlineInterfaceSVG />}
                tooltip={textProvider(language, Texts.select)}
              />
            </StyledTagButtonWrapper>
          </>
        ) : (
          <>
            <StyledTagOptionLabel color={data.color}>{data.label}</StyledTagOptionLabel>
            <StyledTagButton
              onClick={(e: { stopPropagation: () => void }): void => {
                e.stopPropagation();
                setEdit(true);
              }}
              icon={<EditInterfaceSVG />}
              tooltip={textProvider(language, Texts.edit)}
            />
          </>
        )}
      </StyledTagOption>
      {notValid && isEdit && <NotValidMessage>{validateMessage}</NotValidMessage>}
    </ReactSelectComponents.Option>
  );
};
