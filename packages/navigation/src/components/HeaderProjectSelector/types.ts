export type WorkspaceOption = {
  label: string;
  value: string;
};

export type ProjectOption = {
  label: string;
  value: string;
};

export type ProjectPresentation = {
  label: string;
  workspaces: WorkspaceOption[];
};

export type CatalogPresentation = {
  label: string;
  projects: ProjectOption[];
};

export type Item = CatalogPresentation | ProjectPresentation | ProjectOption;
