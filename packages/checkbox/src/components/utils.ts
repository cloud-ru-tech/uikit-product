import { nanoid } from 'nanoid';
import { useRef } from 'react';

export const useElementId = (id?: string): string => {
  const { current: generatedId } = useRef(nanoid());

  return id || generatedId;
};
