export type WorkspaceOption = {
  label: string;
  value: string;
  editable?: boolean;
};

export type ProjectOption = {
  label: string;
  value: string;
  editable?: boolean;
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
