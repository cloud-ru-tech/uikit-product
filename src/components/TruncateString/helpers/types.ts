export interface IGeneralProps {
  marks?: Record<
    number,
    | React.ReactNode
    | {
        style?: React.CSSProperties;
        label?: string;
      }
  >;
  min?: number;
  max?: number;
  dots?: boolean;
  className?: string;
}
