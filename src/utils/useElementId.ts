import { useRef } from 'react';
import { nanoid } from 'nanoid';

export const useElementId = (id?: string): string => {
  const { current: generatedId } = useRef(nanoid());

  return id || generatedId;
};
