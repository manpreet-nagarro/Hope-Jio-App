import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const LeftIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#3535F3",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 18L9 12L15 6"
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftIcon;