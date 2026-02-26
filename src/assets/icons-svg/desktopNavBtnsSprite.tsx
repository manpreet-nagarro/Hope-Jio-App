import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const DesktopNavBtnsSprite: React.FC<IconProps> = ({
  ...props
}) => {
  return (
    <svg
      width={52}
      height={12}
      viewBox="0 0 52 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_5828_71562)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
          fill="#E3E3E3"
        />
        <path
          d="M6 0.25C9.17564 0.25 11.75 2.82436 11.75 6C11.75 9.17564 9.17564 11.75 6 11.75C2.82436 11.75 0.25 9.17564 0.25 6C0.25 2.82436 2.82436 0.25 6 0.25Z"
          stroke="black"
          strokeOpacity={0.12}
          strokeWidth={0.5}
        />
        <mask
          id="mask0_5828_71562"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={12}
          height={13}
        >
          <rect y={0.126465} width={12} height={12} fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_5828_71562)">
          <path
            d="M4.2 8.62642L3.5 7.92642L5.3 6.12642L3.5 4.33892L4.2 3.63892L6 5.43892L7.7875 3.63892L8.4875 4.33892L6.6875 6.12642L8.4875 7.92642L7.7875 8.62642L6 6.82642L4.2 8.62642Z"
            fill="#595959"
          />
        </g>
      </g>
      <g clipPath="url(#clip1_5828_71562)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26 12C29.3137 12 32 9.31371 32 6C32 2.68629 29.3137 0 26 0C22.6863 0 20 2.68629 20 6C20 9.31371 22.6863 12 26 12Z"
          fill="#E3E3E3"
        />
        <path
          d="M26 0.25C29.1756 0.25 31.75 2.82436 31.75 6C31.75 9.17564 29.1756 11.75 26 11.75C22.8244 11.75 20.25 9.17564 20.25 6C20.25 2.82436 22.8244 0.25 26 0.25Z"
          stroke="black"
          strokeOpacity={0.12}
          strokeWidth={0.5}
        />
        <mask
          id="mask1_5828_71562"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={20}
          y={0}
          width={12}
          height={13}
        >
          <rect x={20} y={0.126465} width={12} height={12} fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask1_5828_71562)">
          <path d="M22.5 6.62646V5.62646H29.5V6.62646H22.5Z" fill="#1C1B1F" />
        </g>
      </g>
      <g clipPath="url(#clip2_5828_71562)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M46 12C49.3137 12 52 9.31371 52 6C52 2.68629 49.3137 0 46 0C42.6863 0 40 2.68629 40 6C40 9.31371 42.6863 12 46 12Z"
          fill="#E3E3E3"
        />
        <path
          d="M46 0.25C49.1756 0.25 51.75 2.82436 51.75 6C51.75 9.17564 49.1756 11.75 46 11.75C42.8244 11.75 40.25 9.17564 40.25 6C40.25 2.82436 42.8244 0.25 46 0.25Z"
          stroke="black"
          strokeOpacity={0.12}
          strokeWidth={0.5}
        />
        <mask
          id="mask2_5828_71562"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={39}
          y={-1}
          width={17}
          height={17}
        >
          <rect
            x={39}
            y={5.59058}
            width={12}
            height={12}
            transform="rotate(-30 39 5.59058)"
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask2_5828_71562)">
          <path
            d="M47.9463 9.08572L44.5312 8.17065L48.8614 5.67065L47.9463 9.08572Z"
            fill="#1C1B1F"
          />
        </g>
        <mask
          id="mask3_5828_71562"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={37}
          y={-4}
          width={17}
          height={17}
        >
          <rect
            x={37}
            y={2.12646}
            width={12}
            height={12}
            transform="rotate(-30 37 2.12646)"
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask3_5828_71562)">
          <path
            d="M43.5312 6.43875L44.4463 3.02368L47.8614 3.93875L43.5312 6.43875Z"
            fill="#1C1B1F"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_5828_71562">
          <rect width={12} height={12} fill="white" />
        </clipPath>
        <clipPath id="clip1_5828_71562">
          <rect width={12} height={12} fill="white" transform="translate(20)" />
        </clipPath>
        <clipPath id="clip2_5828_71562">
          <rect width={12} height={12} fill="white" transform="translate(40)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DesktopNavBtnsSprite;
