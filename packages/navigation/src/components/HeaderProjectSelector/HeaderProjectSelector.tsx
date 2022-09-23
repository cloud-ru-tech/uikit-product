import { useState } from 'react';

import { CircleAddInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Scroll } from '@sbercloud/uikit-product-scroll';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { HeaderProjectSelectorAction } from './components/HeaderProjectSelectorAction';
import { HeaderProjectSelectorContent } from './components/HeaderProjectSelectorContent';
import { HeaderProjectSelectorFloating } from './components/HeaderProjectSelectorFloating';
import { HeaderProjectSelectorGroupListItem } from './components/HeaderProjectSelectorGroupListItem';
import { HeaderProjectSelectorOptionListItem } from './components/HeaderProjectSelectorOptionListItem';
import { HeaderProjectSelectorProjectLabel } from './components/HeaderProjectSelectorProjectLabel';
import { HeaderProjectSelectorReference } from './components/HeaderProjectSelectorReference';
import { HeaderProjectSelectorWorkspaceLabel } from './components/HeaderProjectSelectorWorkspaceLabel';
import { DEFAULT_EDITABLE } from './constants';
import { SelectionContext } from './contexts/SelectionContext';
import {
  useContent,
  useIndexByOption,
  useProjects,
  useSelectedIndex,
  useSelectedProject,
  useSelectedWorkspace,
  useWorkspaces,
} from './hooks';
import * as S from './styled';
import { Item } from './types';

export type HeaderProjectSelectorProps = WithSupportProps<{
  value: string;
  items: Item[];
  onChange(value: string): void;
  onCreate?(): void;
  onEdit?(value: string): void;
}>;

export function HeaderProjectSelector({
  value,
  items,
  onChange,
  onCreate,
  onEdit,
  ...rest
}: HeaderProjectSelectorProps) {
  const [search, setSearch] = useState('');
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const projects = useProjects(items);
  const workspaces = useWorkspaces(items);
  const indexByOption = useIndexByOption(projects, workspaces);
  const selectedProject = useSelectedProject(projects, value);
  const selectedWorkspace = useSelectedWorkspace(workspaces, value);
  const selectedIndex = useSelectedIndex(indexByOption, value);
  const content = useContent(items, search, indexByOption, {
    renderOptionList({ children }) {
      return (
        <Scroll flexbox>
          <S.List>{children}</S.List>
        </Scroll>
      );
    },

    renderProjectOptionList({ children }) {
      return (
        <>
          <Scroll flexbox>
            <S.List>{children}</S.List>
          </Scroll>
          {onCreate && (
            <HeaderProjectSelectorAction
              icon={<CircleAddInterfaceSVG />}
              text={textProvider(languageCode, Texts.HeaderProjectSelectorCreateProject)}
              onClick={onCreate}
            />
          )}
        </>
      );
    },

    renderWorkspaceOptionList({ children }) {
      return (
        <>
          <Scroll flexbox>
            <S.List>{children}</S.List>
          </Scroll>
          {onCreate && (
            <HeaderProjectSelectorAction
              icon={<CircleAddInterfaceSVG />}
              text={textProvider(languageCode, Texts.HeaderProjectSelectorCreateWorkspace)}
              onClick={onCreate}
            />
          )}
        </>
      );
    },

    renderGroupListItem({ label, children, index }) {
      return (
        <HeaderProjectSelectorGroupListItem key={index} label={label}>
          <S.List>{children}</S.List>
        </HeaderProjectSelectorGroupListItem>
      );
    },

    renderProjectOptionListItem({ label, value, index, editable = DEFAULT_EDITABLE }) {
      return (
        <HeaderProjectSelectorOptionListItem
          key={value}
          value={value}
          index={index}
          onEdit={editable ? onEdit : undefined}
        >
          <HeaderProjectSelectorProjectLabel
            label={label}
            data-test-id='header-project-selector__project-option-list-item-label'
          />
        </HeaderProjectSelectorOptionListItem>
      );
    },

    renderWorkspaceOptionListItem({ label, value, index, editable = DEFAULT_EDITABLE }) {
      return (
        <HeaderProjectSelectorOptionListItem
          key={value}
          value={value}
          index={index}
          onEdit={editable ? onEdit : undefined}
        >
          <HeaderProjectSelectorWorkspaceLabel
            label={label}
            data-test-id='header-project-selector__workspace-option-list-item-label'
          />
        </HeaderProjectSelectorOptionListItem>
      );
    },
  });

  return (
    <S.Wrapper {...extractSupportProps(rest)}>
      <SelectionContext.Provider value={{ selectedValue: value, selectedIndex, setSelectedValue: onChange }}>
        <HeaderProjectSelectorFloating
          content={
            <HeaderProjectSelectorContent search={search} onSearchChange={setSearch}>
              {content}
            </HeaderProjectSelectorContent>
          }
        >
          <HeaderProjectSelectorReference
            selectedProject={selectedProject?.label}
            selectedWorkspace={selectedWorkspace?.label}
          />
        </HeaderProjectSelectorFloating>
      </SelectionContext.Provider>
    </S.Wrapper>
  );
}
