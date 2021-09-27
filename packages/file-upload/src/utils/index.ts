export const getFileExtension = (mime: string) => mime.split('/')[1];

export const removeExtFromFileName = (value: string) => {
  const arr = value.split('.');
  arr.pop();
  return arr.join('');
};
