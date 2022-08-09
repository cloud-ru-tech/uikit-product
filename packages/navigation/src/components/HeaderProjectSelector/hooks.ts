import { ReactNode } from 'react';

import { CatalogPresentation, Item, ProjectOption, ProjectPresentation, WorkspaceOption } from './types';

type Option = ProjectOption | WorkspaceOption;

type Renderer = {
  renderOptionList(children: ReactNode): ReactNode;
  renderProjectOptionList(children: ReactNode): ReactNode;
  renderWorkspaceOptionList(children: ReactNode): ReactNode;
  renderCatalogPresentationListItem(label: string, children: ReactNode, index: number): ReactNode;
  renderProjectPresentationListItem(label: string, children: ReactNode, index: number): ReactNode;
  renderProjectOptionListItem(label: string, value: string, index: number | null): ReactNode;
  renderWorkspaceOptionListItem(label: string, value: string, index: number | null): ReactNode;
};

function isCatalogPresentation(item: Item): item is CatalogPresentation {
  return 'projects' in item;
}

function isProjectPresentation(item: Item): item is ProjectPresentation {
  return 'workspaces' in item;
}

function isProjectOption(item: Item): item is ProjectOption {
  return 'value' in item;
}

function renderRegular(items: Item[], indexByOption: Map<Option, number>, renderer: Renderer) {
  function renderWorkspaceOption(workspace: WorkspaceOption) {
    return renderer.renderWorkspaceOptionListItem(
      workspace.label,
      workspace.value,
      indexByOption.get(workspace) ?? null,
    );
  }

  function renderProjectOption(project: ProjectOption) {
    return renderer.renderProjectOptionListItem(project.label, project.value, indexByOption.get(project) ?? null);
  }

  function renderProjectPresentation(project: ProjectPresentation, index: number) {
    return renderer.renderProjectPresentationListItem(
      project.label,
      project.workspaces.map(renderWorkspaceOption),
      index,
    );
  }

  function renderCatalogPresentation(catalog: CatalogPresentation, index: number) {
    return renderer.renderCatalogPresentationListItem(catalog.label, catalog.projects.map(renderProjectOption), index);
  }

  function render(items: Item[]) {
    if (items.every(isCatalogPresentation)) {
      return items.length === 1
        ? renderer.renderProjectOptionList(items.flatMap(item => item.projects.map(renderProjectOption)))
        : renderer.renderProjectOptionList(items.map(renderCatalogPresentation));
    }

    if (items.every(isProjectOption)) {
      return renderer.renderProjectOptionList(items.map(renderProjectOption));
    }

    if (items.every(isProjectPresentation)) {
      return renderer.renderWorkspaceOptionList(items.map(renderProjectPresentation));
    }

    return null;
  }

  return render(items);
}

function renderSearch(items: Item[], indexByOption: Map<Option, number>, renderer: Renderer, query: string) {
  function isVisible(option: Option) {
    return option.label.toLowerCase().includes(query);
  }

  function renderWorkspaceOption(workspace: WorkspaceOption) {
    return isVisible(workspace)
      ? renderer.renderWorkspaceOptionListItem(workspace.label, workspace.value, indexByOption.get(workspace) ?? null)
      : null;
  }

  function renderProjectOption(project: ProjectOption) {
    return isVisible(project)
      ? renderer.renderProjectOptionListItem(project.label, project.value, indexByOption.get(project) ?? null)
      : null;
  }

  function render(item: Item) {
    if (isCatalogPresentation(item)) {
      return item.projects.map(renderProjectOption);
    }

    if (isProjectPresentation(item)) {
      return item.workspaces.map(renderWorkspaceOption);
    }

    return isVisible(item) ? renderProjectOption(item) : null;
  }

  return renderer.renderOptionList(items.map(render));
}

export function useProjects(items: Item[]) {
  return items.flatMap(item => (isCatalogPresentation(item) ? item.projects : [item]));
}

export function useWorkspaces(items: Item[]) {
  return items.flatMap(item => (isProjectPresentation(item) ? item.workspaces : []));
}

export function useSelectedProject(projects: Array<ProjectPresentation | ProjectOption>, value: string) {
  return projects.find(project =>
    isProjectOption(project)
      ? project.value === value
      : project.workspaces.some(workspace => workspace.value === value),
  );
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

export function useIndexByOption(projects: Array<ProjectPresentation | ProjectOption>, workspaces: WorkspaceOption[]) {
  return new Map<Option, number>(
    [...projects.filter(isProjectOption), ...workspaces].map((option, index) => [option, index]),
  );
}

export function useContent(items: Item[], search: string, indexByOption: Map<Option, number>, renderer: Renderer) {
  const query = search.trim().toLowerCase();

  return query === ''
    ? renderRegular(items, indexByOption, renderer)
    : renderSearch(items, indexByOption, renderer, query);
}
