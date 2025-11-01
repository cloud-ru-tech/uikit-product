export const readFileContent = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        resolve(e.target.result);
      } else {
        reject(new Error('READ_ERROR: Не удалось прочитать содержимое файла'));
      }
    };

    reader.onerror = () => {
      reject(new Error('READ_ERROR: Не удалось прочитать файл'));
    };

    reader.onabort = () => {
      reject(new Error('READ_ERROR: Чтение файла было прервано'));
    };

    // Читаем как текст
    reader.readAsText(file);
  });
