import type { ReactElement } from "react";

type Props = { size?: number; color?: string };

export default function RadioUnchecked({ size = 18 }: Props): ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="9"
        cy="9"
        r="8"
        stroke="#C9C9C9"
        strokeWidth="1.5"
        fill="transparent"
      />
    </svg>
  );
}
