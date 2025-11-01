export type FileErrorType =
  | 'INVALID_EXTENSION'
  | 'INVALID_MIME_TYPE'
  | 'FILE_TOO_LARGE'
  | 'INVALID_FILE_TYPE'
  | 'READ_ERROR'
  | 'INVALID_SSH_KEY'
  | 'EMPTY_FILE'
  | 'BINARY_DATA'
  | 'UNKNOWN_ERROR';

export const getFileErrorType = (error: unknown): FileErrorType => {
  if (error instanceof Error) {
    const [errorType] = error.message.split(': ');

    switch (errorType as FileErrorType) {
      case 'INVALID_EXTENSION':
      case 'INVALID_MIME_TYPE':
        return 'INVALID_EXTENSION';
      case 'FILE_TOO_LARGE':
        return 'FILE_TOO_LARGE';
      case 'INVALID_FILE_TYPE':
        return 'INVALID_EXTENSION';
      case 'READ_ERROR':
        return 'READ_ERROR';
      case 'INVALID_SSH_KEY':
        // Проверяем специфичные типы ошибок SSH ключа
        if (error.message.includes('пустой') || error.message.includes('empty')) {
          return 'EMPTY_FILE';
        }
        if (error.message.includes('бинарные') || error.message.includes('binary')) {
          return 'BINARY_DATA';
        }
        return 'INVALID_SSH_KEY';
      default:
        return 'UNKNOWN_ERROR';
    }
  }

  return 'UNKNOWN_ERROR';
};
