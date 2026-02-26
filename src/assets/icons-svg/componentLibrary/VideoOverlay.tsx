
import type { SVGProps } from "react";
const SvgVideoOverlay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="75"
    height="46"
    fill="none"
    viewBox="0 0 75 46"
    {...props}
  >
    <rect
      width={37}
      height={39}
      x={38}
      y={7}
      fill="#9EB5FA"
      fillOpacity={0.5}
      rx={2}
    />
  </svg>
);
export default SvgVideoOverlay;
