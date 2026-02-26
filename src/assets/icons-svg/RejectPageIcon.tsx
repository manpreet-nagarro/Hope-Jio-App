import * as React from "react";

export default function RejectPageIcon(props: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg
    width={props.width || 16}
    height={props.height || 16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.00065 8.66927L3.33398 6.0026M3.33398 6.0026L6.00065 3.33594M3.33398 6.0026H10.6673C11.3746 6.0026 12.0528 6.28356 12.5529 6.78365C13.053 7.28375 13.334 7.96203 13.334 8.66927C13.334 9.37651 13.053 10.0548 12.5529 10.5549C12.0528 11.055 11.3746 11.3359 10.6673 11.3359H10.0007"
      stroke="#141414"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
}
