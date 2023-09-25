import { useState } from 'react';

import { CircleAddInterfaceSVG } from '@sbercloud/uikit-product-icons';
import { Scroll } from '@sbercloud/uikit-product-scroll';
import { extractSupportProps, useLanguage, WithSupportProps } from '@sbercloud/uikit-product-utils';

import { textProvider, Texts } from '../../helpers';
import {
  Action,
  Content,
  Floating,
  GroupListItem,
  OptionListItem,
  ProjectLabel,
  Reference,
  WorkspaceLabel,
} from './components';
import { DEFAULT_EDITABLE } from './constants';
import { SelectionContext } from './contexts';
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
import { HeaderSelectorType, Item } from './types';

export type HeaderProjectSelectorProps = WithSupportProps<{
  value: string;
  items: Item[];
  onChange(value: string): void;
  onCreate?(): void;
  onEdit?(value: string): void;
  createDisabledReason?: string;
  isMobile?: boolean;
  selectorType: HeaderSelectorType;
}>;

export function HeaderProjectSelector({
  value,
  items,
  onChange,
  onCreate,
  onEdit,
  createDisabledReason,
  isMobile,
  selectorType = HeaderSelectorType.Project,
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

  const renderCreateProjectButton = () =>
    onCreate && (
      <Action
        icon={<CircleAddInterfaceSVG />}
        text={textProvider(languageCode, Texts.HeaderProjectSelectorCreateProject)}
        createDisabledReason={createDisabledReason}
        onClick={onCreate}
      />
    );

  const renderCreateWorkspaceButton = () =>
    onCreate && (
      <Action
        icon={<CircleAddInterfaceSVG />}
        createDisabledReason={createDisabledReason}
        text={textProvider(languageCode, Texts.HeaderProjectSelectorCreateWorkspace)}
        onClick={onCreate}
      />
    );

  const content = useContent(
    items,
    search,
    indexByOption,
    {
      renderCreateProjectButton,
      renderCreateWorkspaceButton,

      renderOptionList({ children, renderCreateButton }) {
        return (
          <>
            <Scroll flexbox barHideStrategy={Scroll.barHideStrategies.Never}>
              <S.List>{children}</S.List>
            </Scroll>
            {renderCreateButton()}
          </>
        );
      },

      renderGroupListItem({ label, children, index }) {
        return (
          <GroupListItem key={index} label={label}>
            <S.List>{children}</S.List>
          </GroupListItem>
        );
      },

      renderProjectOptionListItem({ label, value, index, editable = DEFAULT_EDITABLE }) {
        return (
          <OptionListItem key={value} value={value} index={index} onEdit={editable ? onEdit : undefined}>
            <ProjectLabel label={label} data-test-id='header-project-selector__project-option-list-item-label' />
          </OptionListItem>
        );
      },

      renderWorkspaceOptionListItem({ label, value, index, editable = DEFAULT_EDITABLE }) {
        return (
          <OptionListItem key={value} value={value} index={index} onEdit={editable ? onEdit : undefined}>
            <WorkspaceLabel label={label} data-test-id='header-project-selector__workspace-option-list-item-label' />
          </OptionListItem>
        );
      },

      renderNoData({ renderCreateButton }) {
        return (
          <>
            <S.NoDataWrapper data-test-id='header-project-selector__no-data'>
              <S.SearchIcon />
              <S.NoDataLabel>{textProvider(languageCode, Texts.NoDataFound)}</S.NoDataLabel>
            </S.NoDataWrapper>
            {renderCreateButton()}
          </>
        );
      },
    },
    selectorType,
  );

  return (
    <S.Wrapper data-mobile={isMobile || undefined} {...extractSupportProps(rest)}>
      <SelectionContext.Provider value={{ selectedValue: value, selectedIndex, setSelectedValue: onChange }}>
        <Floating
          isMobile={isMobile}
          content={
            <Content search={search} onSearchChange={setSearch}>
              {content}
            </Content>
          }
        >
          <Reference
            selectedProject={selectedProject?.label}
            selectedWorkspace={selectedWorkspace?.label}
            isMobile={isMobile}
          />
        </Floating>
      </SelectionContext.Provider>
    </S.Wrapper>
  );
}

HeaderProjectSelector.types = HeaderSelectorType;
