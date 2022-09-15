import { useState } from 'react';

import { CircleAddInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Scroll } from '@sbercloud/uikit-product-scroll';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import { HeaderProjectSelectorAction } from './components/HeaderProjectSelectorAction';
import { HeaderProjectSelectorBox } from './components/HeaderProjectSelectorBox';
import { HeaderProjectSelectorCatalogListItem } from './components/HeaderProjectSelectorCatalogListItem';
import { HeaderProjectSelectorContent } from './components/HeaderProjectSelectorContent';
import { HeaderProjectSelectorFloating } from './components/HeaderProjectSelectorFloating';
import { HeaderProjectSelectorListItem } from './components/HeaderProjectSelectorListItem';
import { HeaderProjectSelectorOptionListItem } from './components/HeaderProjectSelectorOptionListItem';
import { HeaderProjectSelectorProjectLabel } from './components/HeaderProjectSelectorProjectLabel';
import { HeaderProjectSelectorReference } from './components/HeaderProjectSelectorReference';
import { HeaderProjectSelectorWorkspaceLabel } from './components/HeaderProjectSelectorWorkspaceLabel';
import { IndentContext } from './contexts/IndentContext';
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
}>;

export function HeaderProjectSelector({ value, items, onChange, onCreate, ...rest }: HeaderProjectSelectorProps) {
  const [search, setSearch] = useState('');
  const { languageCode } = useLanguage({ onlyEnabledLanguage: true });
  const projects = useProjects(items);
  const workspaces = useWorkspaces(projects);
  const indexByOption = useIndexByOption(projects, workspaces);
  const selectedProject = useSelectedProject(projects, value);
  const selectedWorkspace = useSelectedWorkspace(workspaces, value);
  const selectedIndex = useSelectedIndex(indexByOption, value);
  const content = useContent(items, search, indexByOption, {
    renderOptionList(children) {
      return (
        <Scroll flexbox>
          <S.List>{children}</S.List>
        </Scroll>
      );
    },

    renderProjectOptionList(children) {
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

    renderWorkspaceOptionList(children) {
      return (
        <>
          <Scroll flexbox>
            <S.List>{children}</S.List>
          </Scroll>
          {onCreate && (
            <IndentContext.Provider value={1}>
              <HeaderProjectSelectorAction
                icon={<CircleAddInterfaceSVG />}
                text={textProvider(languageCode, Texts.HeaderProjectSelectorCreateWorkspace)}
                onClick={onCreate}
              />
            </IndentContext.Provider>
          )}
        </>
      );
    },

    renderCatalogPresentationListItem(label, children, index) {
      return (
        <HeaderProjectSelectorCatalogListItem key={index} label={label}>
          <S.List>{children}</S.List>
        </HeaderProjectSelectorCatalogListItem>
      );
    },

    renderProjectPresentationListItem(label, children, index) {
      return (
        <HeaderProjectSelectorListItem key={index} role='presentation'>
          <HeaderProjectSelectorBox>
            <HeaderProjectSelectorProjectLabel
              label={label}
              data-test-id='header-project-selector__project-presentation-list-item-label'
            />
          </HeaderProjectSelectorBox>
          <IndentContext.Provider value={1}>
            <S.List>{children}</S.List>
          </IndentContext.Provider>
        </HeaderProjectSelectorListItem>
      );
    },

    renderProjectOptionListItem(label, value, index) {
      return (
        <HeaderProjectSelectorOptionListItem key={value} value={value} index={index}>
          <HeaderProjectSelectorProjectLabel
            label={label}
            data-test-id='header-project-selector__project-option-list-item-label'
          />
        </HeaderProjectSelectorOptionListItem>
      );
    },

    renderWorkspaceOptionListItem(label, value, index) {
      return (
        <HeaderProjectSelectorOptionListItem key={value} value={value} index={index}>
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
