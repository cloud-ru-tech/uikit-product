type ReadFileContentResult = {
  error: boolean;
  fileContent?: string;
};

export const readFileContent = (file: File): Promise<ReadFileContentResult> =>
  new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && typeof e.target.result === 'string') {
        resolve({ error: false, fileContent: e.target.result });
      } else {
        resolve({ error: true });
      }
    };

    reader.onerror = () => resolve({ error: true });

    reader.onabort = () => resolve({ error: true });

    // Читаем как текст
    reader.readAsText(file);
  });
