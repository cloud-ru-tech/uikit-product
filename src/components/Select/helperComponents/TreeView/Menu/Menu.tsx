import { FC, useState, useCallback, ChangeEvent } from 'react';
import { css } from '@linaria/core';
import RcTree from 'rc-tree';
import { DataNode } from 'rc-tree/lib/interface';
import { MenuProps, Props } from 'react-select';

import { SearchSVG } from '@aicloud/ui-icons';

import { Divider } from 'components/Divider';
import { Avatar } from 'components/Avatar';

import {
  StyledContainer,
  StyledInputContainer,
  StyledSearchInput,
  StyledTreeContainer,
} from './styled';

export interface IOptionProps extends DataNode {
  key: string;
  children: ChildrenProps[];
  title: string;
  src?: string;
  avatarShape?: 'circle' | 'square';
}

export type OptionsProps = IOptionProps[];

type ChildrenProps = { key: string; title: string };
type SelectedProps = {
  options: OptionsProps;
  onChange: (val: OptionsProps) => void;
  value: IOptionProps;
};

export interface IMenuProps extends MenuProps<IOptionProps, true> {
  placeholderSearch?: string;
  selectProps: Props<IOptionProps>;
}

const avatarClassName = css`
  display: inline-block;
  margin-right: 8px;
`;

// TODO: we have to create className instead of wrapping component because of a bug
// https://github.com/NervJS/taro/issues/8325
const searchIconClassname = css`
  position: absolute;
  right: 14px;
  top: 8px;
`;

const Icon = ({ data }: { data: IOptionProps }): React.ReactNode => {
  const { src, avatarShape } = data || {};

  return (
    <Avatar
      size={20}
      src={src}
      shape={avatarShape}
      className={avatarClassName}
    />
  );
};

export const Menu: FC<IMenuProps> = props => {
  const {
    setValue,
    selectProps: { options, onChange, value },
    placeholderSearch,
  } = props;
  const [optionsState, setOptionsState] = useState(options);
  const [searchValue, setSearchValue] = useState('');
  const onCheck = useCallback(checked => {
    const selectedKeys = checked;
    const getRes = (): IOptionProps[] => {
      if (Array.isArray(options) && options.length) {
        return options.reduce<ChildrenProps[]>((acc, option) => {
          const searchValues: ChildrenProps[] = option.children.filter(
            (child: IOptionProps) => selectedKeys.includes(child.key),
          );
          if (Array.isArray(searchValues) && searchValues.length) {
            return [...acc, ...searchValues];
          }
          return acc;
        }, []);
      }
      return [];
    };
    const res = getRes();
    setValue(res, 'set-value');

    if (onChange) {
      onChange(res);
    }
  }, []);
  const handleChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const getSearchRes = (): IOptionProps[] => {
      if (Array.isArray(options)) {
        return options.map(option => {
          const children = option.children.filter((child: IOptionProps) =>
            child.title.includes(e.currentTarget.value),
          );

          return { ...option, children };
        });
      }
      return [];
    };
    const searchResult = getSearchRes();
    setSearchValue(e?.currentTarget?.value);
    setOptionsState(searchResult);
  }, []);
  const values = value;
  // FIXME: useMemo не пашет (
  const defaultCheckedKeys = Array.isArray(values)
    ? values.map((val: IOptionProps) => val.key)
    : [];
  return (
    <StyledContainer>
      <StyledInputContainer>
        {/* FIXME: с нашим инпутом не понятно как бордер менять (: (: */}
        <StyledSearchInput
          onChange={handleChangeSearch}
          value={searchValue}
          placeholder={placeholderSearch}
        />
        <SearchSVG className={searchIconClassname} size={16} wrapperSize={40} />
      </StyledInputContainer>
      <Divider />
      <StyledTreeContainer>
        {optionsState?.length && (
          <RcTree
            treeData={optionsState as DataNode[] | undefined}
            checkable
            defaultExpandAll
            onCheck={onCheck}
            defaultCheckedKeys={defaultCheckedKeys}
            icon={Icon}
          />
        )}
      </StyledTreeContainer>
    </StyledContainer>
  );
};
