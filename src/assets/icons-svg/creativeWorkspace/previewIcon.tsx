import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const PreviewIcon: React.FC<IconProps> = ({
  size = 12,
  color = "white",
  ...props
}) => {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M50.6667 8H13.3333C10.3878 8 8 10.3878 8 13.3333V50.6667C8 53.6122 10.3878 56 13.3333 56H50.6667C53.6122 56 56 53.6122 56 50.6667V13.3333C56 10.3878 53.6122 8 50.6667 8Z"
        stroke="#C9C9C9"
        strokeWidth={5.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.9993 29.3346C26.9449 29.3346 29.3327 26.9468 29.3327 24.0013C29.3327 21.0558 26.9449 18.668 23.9993 18.668C21.0538 18.668 18.666 21.0558 18.666 24.0013C18.666 26.9468 21.0538 29.3346 23.9993 29.3346Z"
        stroke="#C9C9C9"
        strokeWidth={5.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56 40.0018L47.7707 31.7725C46.7705 30.7726 45.4142 30.2109 44 30.2109C42.5858 30.2109 41.2295 30.7726 40.2293 31.7725L16 56.0018"
        stroke="#C9C9C9"
        strokeWidth={5.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PreviewIcon;
