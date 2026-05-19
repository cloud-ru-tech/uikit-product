import debounce from 'lodash.debounce';
import { useMemo, useRef } from 'react';

export function useHighlight(className: string) {
  const element = useRef<HTMLElement>();

  return useMemo(
    () => {
      const scheduleHighlight = debounce(() => {
        element.current?.classList.add(className);
        setTimeout(
          () => {
            element.current?.classList.remove(className);
            element.current = undefined;
          },
          300,
          { trailing: false },
        );
      }, 80);

      return (elementToHighlight?: HTMLElement | null) => {
        if (elementToHighlight) {
          element.current = elementToHighlight;
        }
        scheduleHighlight();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
