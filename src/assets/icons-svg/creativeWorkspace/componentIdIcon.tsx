import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

const ComponentIdIcon: React.FC<IconProps> = ({
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
        d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z"
        stroke="#595959"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.99935 7.33464C6.73573 7.33464 7.33268 6.73768 7.33268 6.0013C7.33268 5.26492 6.73573 4.66797 5.99935 4.66797C5.26297 4.66797 4.66602 5.26492 4.66602 6.0013C4.66602 6.73768 5.26297 7.33464 5.99935 7.33464Z"
        stroke="#595959"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 9.9985L11.9427 7.94116C11.6926 7.6912 11.3536 7.55078 11 7.55078C10.6464 7.55078 10.3074 7.6912 10.0573 7.94116L4 13.9985"
        stroke="#595959"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ComponentIdIcon;
