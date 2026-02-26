import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const TuneIcon: React.FC<IconProps> = ({
  size = 32,
  color = "#3535F3",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <path
    d="M18.668 22.6667H6.66797"
    stroke={color}
    stroke-width="2.66667"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M25.332 9.33325H13.332"
    stroke={color}
    stroke-width="2.66667"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M22.668 26.6667C24.8771 26.6667 26.668 24.8759 26.668 22.6667C26.668 20.4576 24.8771 18.6667 22.668 18.6667C20.4588 18.6667 18.668 20.4576 18.668 22.6667C18.668 24.8759 20.4588 26.6667 22.668 26.6667Z"
    stroke={color}
    stroke-width="2.66667"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M9.33203 13.3333C11.5412 13.3333 13.332 11.5424 13.332 9.33325C13.332 7.12411 11.5412 5.33325 9.33203 5.33325C7.12289 5.33325 5.33203 7.12411 5.33203 9.33325C5.33203 11.5424 7.12289 13.3333 9.33203 13.3333Z"
    stroke={color}
    stroke-width="2.66667"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
    </svg>
  );
};

export default TuneIcon;
