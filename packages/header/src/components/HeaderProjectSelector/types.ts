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

export type ProjectGroup = {
  label: string;
  projects: ProjectOption[];
};

export type WorkspaceGroup = {
  label: string;
  workspaces: WorkspaceOption[];
};

export type Item = ProjectGroup | WorkspaceGroup;

export enum HeaderSelectorType {
  Project = 'project',
  Workspace = 'workspace',
}
