import { components as ReactSelectComponents } from 'react-select';

export function Input(props: React.ComponentProps<typeof ReactSelectComponents.Input>): JSX.Element {
  return <ReactSelectComponents.Input {...props} isHidden />;
}
