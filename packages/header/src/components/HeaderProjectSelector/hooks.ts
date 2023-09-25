import { Children, ReactNode } from 'react';

import { HeaderSelectorType, Item, ProjectGroup, ProjectOption, WorkspaceGroup, WorkspaceOption } from './types';

type Option = ProjectOption | WorkspaceOption;

type CreateButtonParams = {
  renderCreateButton: () => ReactNode;
};

type OptionListParams = {
  children: ReactNode;
};

type GroupListItemParams = {
  label: string;
  children: ReactNode;
  index: number;
};

type OptionListItemParams = {
  label: string;
  value: string;
  index: number | null;
  editable?: boolean;
};

type Renderer = {
  renderOptionList(params: OptionListParams & CreateButtonParams): ReactNode;
  renderGroupListItem(params: GroupListItemParams): ReactNode;
  renderProjectOptionListItem(params: OptionListItemParams): ReactNode;
  renderWorkspaceOptionListItem(params: OptionListItemParams): ReactNode;
  renderCreateProjectButton(): ReactNode;
  renderCreateWorkspaceButton(): ReactNode;
  renderNoData(params: CreateButtonParams): ReactNode;
};

function isProjectGroup(item: Item): item is ProjectGroup {
  return 'projects' in item;
}

function isWorkspaceGroup(item: Item): item is WorkspaceGroup {
  return 'workspaces' in item;
}

function renderRegular(
  items: Item[],
  indexByOption: Map<Option, number>,
  renderer: Renderer,
  selectorType: HeaderSelectorType,
) {
  function isFlat() {
    return items.length === 1;
  }

  function renderWorkspaceOption(workspace: WorkspaceOption) {
    return renderer.renderWorkspaceOptionListItem({
      label: workspace.label,
      value: workspace.value,
      index: indexByOption.get(workspace) ?? null,
      editable: workspace.editable,
    });
  }

  function renderProjectOption(project: ProjectOption) {
    return renderer.renderProjectOptionListItem({
      label: project.label,
      value: project.value,
      index: indexByOption.get(project) ?? null,
      editable: project.editable,
    });
  }

  function renderWorkspaceGroup(group: WorkspaceGroup, index: number) {
    return renderer.renderGroupListItem({
      label: group.label,
      children: group.workspaces.map(renderWorkspaceOption),
      index,
    });
  }

  function renderProjectGroup(group: ProjectGroup, index: number) {
    return renderer.renderGroupListItem({
      label: group.label,
      children: group.projects.map(renderProjectOption),
      index,
    });
  }

  function getNoData() {
    switch (selectorType) {
      case HeaderSelectorType.Workspace:
        return renderer.renderNoData({ renderCreateButton: renderer.renderCreateWorkspaceButton });
      case HeaderSelectorType.Project:
      default:
        return renderer.renderNoData({ renderCreateButton: renderer.renderCreateProjectButton });
    }
  }

  function render(items: Item[]) {
    if (items.length === 0) {
      return getNoData();
    }

    if (items.every(isProjectGroup)) {
      return renderer.renderOptionList({
        children: isFlat()
          ? items.flatMap(item => item.projects.map(renderProjectOption))
          : items.map(renderProjectGroup),
        renderCreateButton: renderer.renderCreateProjectButton,
      });
    }

    if (items.every(isWorkspaceGroup)) {
      return renderer.renderOptionList({
        children: isFlat()
          ? items.flatMap(item => item.workspaces.map(renderWorkspaceOption))
          : items.map(renderWorkspaceGroup),
        renderCreateButton: renderer.renderCreateWorkspaceButton,
      });
    }

    return null;
  }

  return render(items);
}

function renderSearch(items: Item[], indexByOption: Map<Option, number>, renderer: Renderer, query: string) {
  function isVisible(option: Option) {
    return option.label.toLowerCase().includes(query.toLowerCase());
  }

  function renderWorkspaceOption(workspace: WorkspaceOption) {
    return isVisible(workspace)
      ? renderer.renderWorkspaceOptionListItem({
          label: workspace.label,
          value: workspace.value,
          index: indexByOption.get(workspace) ?? null,
          editable: workspace.editable,
        })
      : null;
  }

  function renderProjectOption(project: ProjectOption) {
    return isVisible(project)
      ? renderer.renderProjectOptionListItem({
          label: project.label,
          value: project.value,
          index: indexByOption.get(project) ?? null,
          editable: project.editable,
        })
      : null;
  }

  function render(item: Item) {
    if (isProjectGroup(item)) {
      return item.projects.map(renderProjectOption);
    }

    if (isWorkspaceGroup(item)) {
      return item.workspaces.map(renderWorkspaceOption);
    }

    return null;
  }

  function renderCreateButton() {
    if (items.every(isProjectGroup)) {
      return renderer.renderCreateProjectButton();
    }

    if (items.every(isWorkspaceGroup)) {
      return renderer.renderCreateWorkspaceButton();
    }

    return null;
  }

  const children = items.flatMap(render).filter(item => Boolean(item));

  return Children.count(children) === 0
    ? renderer.renderNoData({ renderCreateButton })
    : renderer.renderOptionList({ children, renderCreateButton });
}

export function useProjects(items: Item[]) {
  return items.flatMap(item => (isProjectGroup(item) ? item.projects : []));
}

export function useWorkspaces(items: Item[]) {
  return items.flatMap(item => (isWorkspaceGroup(item) ? item.workspaces : []));
}

export function useSelectedProject(projects: ProjectOption[], value: string) {
  return projects.find(project => project.value === value);
}

export function useSelectedWorkspace(workspaces: WorkspaceOption[], value: string) {
  return workspaces.find(workspace => workspace.value === value);
}

export function useSelectedIndex(indexByOption: Map<Option, number>, value: string) {
  for (const [option, index] of indexByOption.entries()) {
    if (option.value === value) {
      return index;
    }
  }

  return null;
}

export function useIndexByOption(projects: ProjectOption[], workspaces: WorkspaceOption[]) {
  return new Map<Option, number>([...projects, ...workspaces].map((option, index) => [option, index]));
}

export function useContent(
  items: Item[],
  search: string,
  indexByOption: Map<Option, number>,
  renderer: Renderer,
  type: HeaderSelectorType,
) {
  const query = search.trim();

  return query === ''
    ? renderRegular(items, indexByOption, renderer, type)
    : renderSearch(items, indexByOption, renderer, query);
}
