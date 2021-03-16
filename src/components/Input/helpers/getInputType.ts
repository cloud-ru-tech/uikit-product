const TYPE_SETTINGS: { [key: string]: string } = {
  security: 'password',
  number: 'number',
  default: 'text',
  embed: 'text',
};

export const getInputType = ({
  isViewMode,
  type,
}: {
  type: string;
  isViewMode: boolean;
}): string => {
  if (TYPE_SETTINGS[type] === TYPE_SETTINGS.security) {
    if (!isViewMode) {
      return TYPE_SETTINGS[type];
    }

    return TYPE_SETTINGS.default;
  }

  return TYPE_SETTINGS[type] || 'text';
};
