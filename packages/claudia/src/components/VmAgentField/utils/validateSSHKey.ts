const MAX_FILE_SIZE = 10 * 1024; // 10KB по умолчанию

const SSH_KEY_BEGIN_PATTERN = [
  /^-----BEGIN (?:RSA|DSA|EC|OPENSSH) PRIVATE KEY-----/,
  /^-----BEGIN.*PRIVATE KEY-----/,
  /^-----BEGIN.*CERTIFICATE-----/,
];

const SSH_KEY_END_PATTERN = [
  /-----END (?:RSA|DSA|EC|OPENSSH) PRIVATE KEY-----/,
  /-----END.*PRIVATE KEY-----/,
  /-----END.*CERTIFICATE-----/,
];

const checkIsFileSizeError = (file: File) => file.size > MAX_FILE_SIZE;

function getFileExtension(filename: string) {
  return filename.includes('.') ? filename.split('.').pop() : '';
}

const checkIsFileTypeError = (file: File) => Boolean(getFileExtension(file.name));

export const validateFileErrors = (file: File) => ({
  fileSize: checkIsFileSizeError(file),
  fileType: checkIsFileTypeError(file),
});

const checkIsEmptyContent = (value: string) => !value.trim().length;

const checkIsBinaryCharsInContent = (value: string) => {
  const binaryChars = value
    .split('')
    .filter(char => char.charCodeAt(0) < 32 && !['\n', '\r', '\t'].includes(char)).length;

  return binaryChars > value.length * 0.1;
};

const removePEMBoundaries = (sshFileContent: string) => {
  let replacedContent = sshFileContent.trim().replaceAll('\n', '');
  let isBeginPartExist = false;
  let isEndPartExist = false;

  SSH_KEY_BEGIN_PATTERN.forEach(pattern => {
    if (pattern.test(replacedContent)) {
      isBeginPartExist = true;
      replacedContent = replacedContent.replace(new RegExp(pattern, 'g'), '');
    }
  });

  SSH_KEY_END_PATTERN.forEach(pattern => {
    if (pattern.test(replacedContent)) {
      isEndPartExist = true;
      replacedContent = replacedContent.replace(new RegExp(pattern, 'g'), '');
    }
  });

  return { isError: !(isBeginPartExist && isEndPartExist), content: replacedContent };
};

const checkIsSshKeyError = (value: string) => {
  const { isError, content: base64content } = removePEMBoundaries(value);

  if (isError) {
    return true;
  }

  const base64Regexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[+/=])[A-Za-z0-9+/=\r\n]+$/;

  return !base64Regexp.test(base64content);
};

export const validateSshKeyErrors = (value: string) => ({
  binaryChars: checkIsBinaryCharsInContent(value),
  emptyFile: checkIsEmptyContent(value),
  invalidSSHKey: checkIsSshKeyError(value),
});
