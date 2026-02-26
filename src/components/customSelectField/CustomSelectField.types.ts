export type SelectFieldProps = {
  controlRef: React.RefObject<HTMLDivElement | null>;
  selected: boolean;
  ariaLabel: string;
  value?: string;
  onChangeValue: (val: string) => void;
  options?: string[];
  emptyLabel?: string;
  normalizeOption?: (s: string) => string;
  defaultOptionText?:string;
  renderNormalizeText?: (s: string) => string;
  showDefaultOption?: boolean;
};