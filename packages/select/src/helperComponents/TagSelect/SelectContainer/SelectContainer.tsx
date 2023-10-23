import { useEffect } from 'react';
import { components as ReactSelectComponents } from 'react-select';

export function SelectContainer(
  props: React.ComponentProps<typeof ReactSelectComponents.SelectContainer>,
): JSX.Element {
  const {
    children,
    selectProps: { containerRef, modalInstance },
  } = props;

  useEffect(() => {
    const containerEl = containerRef?.current;
    const toggleMenu = (e: MouseEvent): void => {
      const path = (e as MouseEvent & { path: HTMLDivElement[] }).path || e?.composedPath();

      if (!path || !containerEl) {
        return;
      }

      const isContain = path.indexOf(containerEl) !== -1;
      const isModal = modalInstance && path.indexOf(modalInstance) !== -1;

      if (!(isContain || isModal)) {
        props.selectProps.toggleMenu(false);
      }
    };

    document.body?.addEventListener('click', toggleMenu);

    return (): void => {
      document.body?.removeEventListener('click', toggleMenu);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current, modalInstance]);

  return (
    <ReactSelectComponents.SelectContainer {...props}>
      <div ref={containerRef}>{children}</div>
    </ReactSelectComponents.SelectContainer>
  );
}
