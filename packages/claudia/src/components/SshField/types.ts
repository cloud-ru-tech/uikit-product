type FileError = {
  fileType: boolean;
  fileSize: boolean;
  readError: boolean;
};

type FileContentError = {
  binaryData: boolean;
  emptyFile: boolean;
  invalidSSHKey: boolean;
};

export type ValidationState = Partial<FileError & FileContentError>;
