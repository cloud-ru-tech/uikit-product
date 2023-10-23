import { styled } from '@linaria/react';
import isEqual from 'lodash.isequal';
import { EventDataNode } from 'rc-tree/lib/interface';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { Divider } from '@sbercloud/uikit-product-divider';
import { useLanguage } from '@sbercloud/uikit-product-utils';

import {
  CheckedType,
  OptionType,
  TextLike,
  UsersByGroup,
  UsersByGroupProps,
  ValueContainer,
} from '../../helperComponents/InlineTreeSelect';
import { InputSearch } from '../../helperComponents/Shared/InputSearch';
import { DictionaryPropertyAsFn, textProvider, Texts } from '../../helpers/texts-provider';

const Content = styled.div`
  /* stylelint-disable-next-line color-no-hex */
  background: #fff;
  /* stylelint-disable-next-line color-no-hex */
  border: 1px solid #d2d2d2;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
`;

export type ChildrenProps = {
  search: string;
  handleChange: UsersByGroupProps['onChange'];
  keys?: CheckedType;
};

type ChildrenFunction = (props: ChildrenProps) => ReactNode;

export type InlineTreeSelectProps = {
  children: ReactNode | ChildrenFunction;
  value?: CheckedType;
  defaultValue?: CheckedType;
  options: OptionType[];
  onChange?: (checked: CheckedType) => void;
  valueFormatter?: (value?: TextLike[]) => string | ReactNode;
  disabled: boolean;
};

const emptyChecked: CheckedType = { checked: [], halfChecked: [] };

export function InlineTreeSelect({
  children,
  value,
  defaultValue,
  onChange,
  valueFormatter,
  disabled,
}: InlineTreeSelectProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [stateValue, setStateValue] = useState<CheckedType>();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isEqual(stateValue, value)) {
      return;
    }

    setStateValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    setStateValue(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [disabled]);

  return (
    <>
      <ValueContainer
        value={stateValue?.checked as TextLike[]}
        valueFormatter={valueFormatter}
        open={open}
        setOpen={setOpen}
        disabled={disabled}
      />
      {open && (
        <Content>
          <InputSearch value={search} onChange={setSearch} />
          <Divider />
          {typeof children === 'function'
            ? children({
                search,
                handleChange: (checked: CheckedType) => {
                  setStateValue(checked);
                  onChange?.(checked);
                },
                keys: stateValue,
              })
            : children}
        </Content>
      )}
    </>
  );
}

export type UsersByGroupSelectProps = {
  value?: CheckedType;
  defaultValue?: CheckedType;
  options: OptionType[];
  searchProps?: TextLike[];
  onChange?: (checked: CheckedType | undefined) => void;
  disabled?: boolean;
};

const lCase = (str: string): string => str.toLowerCase();

export function UsersByGroupSelect({
  value,
  defaultValue,
  options,
  onChange,
  searchProps = ['title'],
  disabled = false,
}: UsersByGroupSelectProps) {
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const [groupKeys, setGroupsKeys] = useState<React.ReactText[]>();
  useEffect(() => {
    const keys = options.map(option => option.key);
    setGroupsKeys(keys);
  }, [options]);

  const filterData = useCallback(
    (node: EventDataNode) => {
      if (!searchProps || !searchProps.length) {
        return [];
      }
      const { children } = node;
      let data = children ? [] : searchProps.map(prop => node[prop]);
      if (children) {
        searchProps.forEach(prop => {
          data = [...data, ...children.map(option => option[prop as keyof OptionType])];
        });
      }
      return data.filter(Boolean);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options],
  );

  return (
    <InlineTreeSelect
      value={value}
      defaultValue={defaultValue}
      options={options}
      valueFormatter={(val): string =>
        textProvider<DictionaryPropertyAsFn>(languageCode, Texts.UsersSelected)({ count: val?.length || 0 })
      }
      onChange={onChange}
      disabled={disabled}
    >
      {({ search, handleChange, keys = emptyChecked }: ChildrenProps): ReactNode => (
        <UsersByGroup
          isFiltered={Boolean(search)}
          options={options}
          checkedKeys={keys}
          onChange={(checked): void => {
            handleChange?.({
              ...checked,
              checked: checked.checked?.filter(id => groupKeys?.indexOf(id) === -1),
            });
          }}
          filter={
            search
              ? (node): boolean => {
                  const data = filterData(node);
                  return Boolean(data.filter(title => lCase(title).indexOf(lCase(search)) !== -1).length);
                }
              : undefined
          }
        />
      )}
    </InlineTreeSelect>
  );
}
