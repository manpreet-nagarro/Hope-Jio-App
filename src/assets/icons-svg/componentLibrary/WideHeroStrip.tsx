
import type { SVGProps } from "react";
const SvgWideHeroStrip = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="81"
    height="10"
    fill="none"
    viewBox="0 0 81 10"
    {...props}
  >
    <rect width={81} height={10} fill="#9EB5FA" fillOpacity={0.5} rx={2} />
  </svg>
);
export default SvgWideHeroStrip;
