import { components as ReactSelectComponents } from 'react-select';

export const Control = (
  props: React.ComponentProps<typeof ReactSelectComponents.Control>,
): JSX.Element => {
  const {
    selectProps: { customControl, menuIsOpen, toggleMenu },
  } = props;

  const isFunc = typeof customControl === 'function';
  if (isFunc) {
    return customControl({
      toggleMenu: props.selectProps.toggleMenu,
      menuIsOpen,
    });
  }

  return (
    <div onClick={toggleMenu}>
      <ReactSelectComponents.Control {...props} />
    </div>
  );
};
