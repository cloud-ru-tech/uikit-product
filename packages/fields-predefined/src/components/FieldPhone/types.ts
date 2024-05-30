import { ReactNode } from 'react';
import { useIMask } from 'react-imask';

export type FieldPhoneOptionsProps = {
  id: string;
  beforeContent: ReactNode;
  content: {
    option: string;
    caption: string;
  };
  mask: string;
};

export type MaskOptions = Parameters<typeof useIMask>[0];
