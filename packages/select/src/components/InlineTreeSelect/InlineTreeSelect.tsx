import { styled } from '@linaria/react';
import isEqual from 'lodash.isequal';
import { FC, useCallback, useEffect, useState } from 'react';

import { Divider } from '@sbercloud/uikit-react-divider';

import { IOptionType, IUsersByGroupProps, UsersByGroup, ValueContainer } from '../../helperComponents/InlineTreeSelect';
import { InputSearch } from '../../helperComponents/Shared/InputSearch';
import { selectUserDeclination } from '../../helpers/declination';

const Content = styled.div`
  background: #ffffff;
  border: 1px solid #d2d2d2;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
`;

export type CheckedType = {
  checked: React.ReactText[] | { checked: React.ReactText[]; halfChecked: React.ReactText[] };
  halfChecked?: React.ReactText[];
};

export interface IInlineTreeSelectProps {
  value?: CheckedType;
  defaultValue?: CheckedType;
  options: IOptionType[];
  onChange?: (checked: CheckedType | undefined) => void;
  valueFormatter?: (value?: React.ReactText[]) => string | React.ReactNode;
  disabled: boolean;
}

export type ChildrenProps = {
  search: string;
  handleChange: IUsersByGroupProps['onChange'];
  keys: string[];
};

export const InlineTreeSelect: FC<IInlineTreeSelectProps> = ({
  children,
  value,
  defaultValue,
  onChange,
  valueFormatter,
  disabled,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [stateValue, setStateValue] = useState<CheckedType | undefined>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (isEqual(stateValue, value)) {
      return;
    }

    setStateValue(value);
  }, [value]);

  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    setStateValue(defaultValue);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [disabled]);

  return (
    <>
      <ValueContainer
        value={stateValue?.checked as React.ReactText[]}
        valueFormatter={valueFormatter}
        open={open}
        setOpen={setOpen}
        disabled={disabled}
      />
      {open && (
        <Content>
          <InputSearch value={search} onChange={setSearch} />
          <Divider style={{ margin: 0 }} />
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
};

export interface IUsersByGroupSelectProps {
  value?: CheckedType;
  defaultValue?: CheckedType;
  options: IOptionType[];
  searchProps?: React.ReactText[];
  onChange?: (checked: CheckedType | undefined) => void;
  disabled?: boolean;
}

const lCase = (str: string): string => str.toLowerCase();

export const UsersByGroupSelect: FC<IUsersByGroupSelectProps> = ({
  value,
  defaultValue,
  options,
  onChange,
  searchProps = ['title'],
  disabled = false,
}) => {
  const [groupKeys, setGroupsKeys] = useState<React.ReactText[]>();
  useEffect(() => {
    const keys = options.map(option => option.key);
    setGroupsKeys(keys);
  }, [options]);

  const filterData = useCallback(
    node => {
      if (!searchProps || !searchProps.length) {
        return [];
      }
      const { children } = node;
      let data = children ? [] : searchProps.map(prop => node[prop]);
      if (children) {
        searchProps.forEach(prop => {
          data = [...data, ...children.map((option: IOptionType) => option[prop as keyof IOptionType])];
        });
      }
      return data.filter(Boolean);
    },
    [options],
  );

  return (
    <InlineTreeSelect
      value={value}
      defaultValue={defaultValue}
      options={options}
      valueFormatter={(val): string => selectUserDeclination(val?.length || 0)}
      onChange={onChange}
      disabled={disabled}
    >
      {({ search, handleChange, keys }: ChildrenProps): React.ReactNode => (
        <UsersByGroup
          options={options}
          checkedKeys={keys}
          onChange={(checked): void => {
            handleChange?.({
              ...checked,
              checked: (checked.checked as React.ReactText[])?.filter(
                (id: React.ReactText) => groupKeys?.indexOf(id) === -1,
              ),
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
};
