import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const ProfileIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#141414",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.00098 7.33301C10.9465 7.33301 13.334 8.97496 13.334 11C13.334 13.025 10.9465 14.667 8.00098 14.667C5.05546 14.667 2.66797 13.025 2.66797 11C2.66797 8.97496 5.05546 7.33301 8.00098 7.33301ZM8.00098 1.33301C9.47374 1.33301 10.668 2.52724 10.668 4C10.668 5.47276 9.47374 6.66699 8.00098 6.66699C6.52822 6.66699 5.33398 5.47276 5.33398 4C5.33398 2.52724 6.52822 1.33301 8.00098 1.33301Z"
        fill={color}
      />
    </svg>
  );
};

export default ProfileIcon;
