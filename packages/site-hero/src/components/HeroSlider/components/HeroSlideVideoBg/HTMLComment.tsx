import { createRef, RefObject, useEffect } from 'react';

type Props = {
  text: string;
};

export function HTMLComment({ text }: Props) {
  const ref: RefObject<HTMLSpanElement> = createRef();

  useEffect(() => {
    let el: HTMLSpanElement | null = null;
    let parent: ParentNode | null = null;
    let comm: Comment | null = null;

    if (ref.current) {
      el = ref.current;
      parent = el.parentNode;
      comm = document.createComment(` ${text.trim()} `);

      try {
        if (parent && parent.contains(el)) {
          parent.replaceChild(comm, el);
        }
        // eslint-disable-next-line
      } catch {}
    }

    return () => {
      if (parent && el && comm) {
        parent.replaceChild(el, comm);
      }
    };
  }, [ref, text]);

  return <span ref={ref} style={{ display: 'none' }} />;
}
