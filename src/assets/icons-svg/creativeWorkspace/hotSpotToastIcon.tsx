import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const HotspotToastIcon: React.FC<IconProps> = ({
  size = 12,
  color = "white",
  ...props
}) => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.33333 2.73438L8 4.00104"
        stroke="#595959"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.40013 5.33411L1.4668 4.80078"
        stroke="#595959"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.00007 8L2.7334 9.33333"
        stroke="#595959"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.7998 1.46484L5.33314 3.39818"
        stroke="#595959"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.02444 6.46173C5.99859 6.40083 5.99152 6.3336 6.00415 6.26865C6.01677 6.20371 6.04851 6.14402 6.09529 6.09724C6.14207 6.05046 6.20176 6.01872 6.2667 6.0061C6.33164 5.99348 6.39888 6.00054 6.45977 6.02639L13.7931 9.02639C13.8584 9.05317 13.9135 9.09996 13.9504 9.16004C13.9874 9.22011 14.0044 9.29037 13.9989 9.3607C13.9934 9.43103 13.9658 9.49781 13.9199 9.55143C13.8741 9.60504 13.8124 9.64273 13.7438 9.65906L10.8444 10.3531C10.7248 10.3817 10.6153 10.4428 10.5282 10.5298C10.4412 10.6167 10.3799 10.7261 10.3511 10.8457L9.65778 13.7457C9.64162 13.8146 9.60397 13.8765 9.55029 13.9226C9.4966 13.9686 9.42966 13.9964 9.35914 14.0019C9.28862 14.0074 9.21819 13.9903 9.15802 13.9531C9.09785 13.9159 9.05107 13.8606 9.02444 13.7951L6.02444 6.46173Z"
        stroke="#595959"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HotspotToastIcon;
