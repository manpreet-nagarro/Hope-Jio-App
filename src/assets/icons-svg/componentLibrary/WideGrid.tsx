
import type { SVGProps } from "react";
const SvgWideGrid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="81"
    height="28"
    fill="none"
    viewBox="0 0 81 28"
    {...props}
  >
    <path
      fill="#9EB5FA"
      fillOpacity={0.5}
      d="M0 2a2 2 0 0 1 2-2h25v28H2a2 2 0 0 1-2-2z"
    />
    <path fill="#E7EBF8" d="M27 0h27v28H27z" />
    <path
      fill="#E7EBF8"
      fillOpacity={0.5}
      d="M54 0h25a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H54z"
    />
  </svg>
);
export default SvgWideGrid;
