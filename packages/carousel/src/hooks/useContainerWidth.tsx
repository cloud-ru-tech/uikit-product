import { RefObject, useEffect, useState } from 'react';

export function useContainerWidth(ref: RefObject<HTMLDivElement>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(ref.current?.offsetWidth || 0);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth, ref.current]);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [ref.current?.offsetWidth]);

  return width;
}
