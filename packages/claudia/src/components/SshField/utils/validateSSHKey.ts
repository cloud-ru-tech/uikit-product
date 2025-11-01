export const validateSSHKeyContent = (content: string): void => {
  const trimmedContent = content.trim();

  // Проверка на пустой файл
  if (trimmedContent.length === 0) {
    throw new Error('INVALID_SSH_KEY: Файл пустой');
  }

  // Проверка на бинарный файл (простейшая проверка)
  const binaryChars = content
    .split('')
    .filter(char => char.charCodeAt(0) < 32 && char !== '\n' && char !== '\r' && char !== '\t').length;

  if (binaryChars > content.length * 0.1) {
    // Если больше 10% бинарных символов
    throw new Error('INVALID_SSH_KEY: Файл содержит бинарные данные, а не текстовый SSH ключ');
  }

  // Базовая проверка на формат SSH ключа
  const sshKeyPatterns = [
    /^-----BEGIN (?:RSA|DSA|EC|OPENSSH) PRIVATE KEY-----/,
    /^ssh-(rsa|dsa|ecdsa|ed25519)/,
    /^ecdsa-sha2-nistp/,
    /^-----BEGIN.*PRIVATE KEY-----/,
    /^-----BEGIN.*CERTIFICATE-----/,
  ];

  const isValidSSHKey = sshKeyPatterns.some(pattern => pattern.test(trimmedContent));

  if (!isValidSSHKey) {
    throw new Error(
      'INVALID_SSH_KEY: Файл не содержит валидный SSH ключ. Поддерживаются: RSA, DSA, ECDSA, Ed25519 ключи и сертификаты',
    );
  }
};

const DEFAULT_ALLOWED_MIME_TYPES = ['text/plain'];
const MAX_FILE_SIZE = 10 * 1024; // 10KB по умолчанию

const getFileExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');

  // Если точка не найдена или это первая точка в имени файла (скрытые файлы в Unix)
  if (lastDotIndex <= 0) {
    return '';
  }

  return filename.toLowerCase().slice(lastDotIndex);
};

const getFileMimeType = (file: File): string => file.type;

export const validateFileType = (file: File): void => {
  const fileExtension = getFileExtension(file.name);
  const mimeType = getFileMimeType(file);

  // Проверка по MIME type (более надежный способ)
  const isValidMimeType = DEFAULT_ALLOWED_MIME_TYPES.some(
    allowedMime => mimeType.includes(allowedMime) || allowedMime.includes(mimeType),
  );

  // Файл должен пройти хотя бы одну проверку
  if (!isValidMimeType) {
    throw new Error(
      `INVALID_MIME_TYPE: Неподходящий тип файла. MIME: ${mimeType}, расширение: ${fileExtension || 'нет'}. ` +
        `Разрешенные MIME types: ${DEFAULT_ALLOWED_MIME_TYPES.join(', ')}, `,
    );
  }
};

export const validateFileSize = (file: File): void => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `FILE_TOO_LARGE: Файл слишком большой. Размер: ${(file.size / 1024).toFixed(2)}KB, ` +
        `максимальный: ${MAX_FILE_SIZE / 1024}KB`,
    );
  }

  // Минимальный размер для SSH ключа (примерно 100 байт)
  const minFileSize = 100;
  if (file.size < minFileSize) {
    throw new Error(`INVALID_FILE_TYPE: Файл слишком маленький для SSH ключа. Минимальный размер: ${minFileSize} байт`);
  }
};
