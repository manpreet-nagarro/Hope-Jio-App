import * as React from "react";
import { useId } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { InlineLoaderWrapper, LoaderContainer } from "./Loader.styles";

type LoaderVariant = "global" | "inline";

type LoaderProps = {
  open: boolean;
  variant?: LoaderVariant;
  size?: number;
  thickness?: number;
};

interface ProgressWithGradientProps {
  id: string;
  size: number;
  thickness: number;
}
const ProgressWithGradient: React.FC<ProgressWithGradientProps> = ({ id, size, thickness }: ProgressWithGradientProps) => (
  <>
    <svg width={0} height={0} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e01cd5" />
          <stop offset="100%" stopColor="#1CB5E0" />
        </linearGradient>
      </defs>
    </svg>

    <CircularProgress
      size={size}
      thickness={thickness}
      sx={{
        "svg circle": {
          stroke: `url(#${id})`,
        },
      }}
    />
  </>
);

const Loader: React.FC<LoaderProps> = ({
  open,
  variant = "global",
  size,
  thickness = 4,
}) => {
  const id = useId();
  const gradientId = `loader-gradient-${id}`;

  const spinnerSize = size ?? (variant === "inline" ? 40 : 56);

  if (variant === "inline") {
    return (
      <tr>
        <td colSpan={100} style={{ textAlign: 'center', padding: 0 }}>
          <InlineLoaderWrapper>
            <ProgressWithGradient id={gradientId} size={spinnerSize} thickness={thickness} />
          </InlineLoaderWrapper>
        </td>
      </tr>
    );
  }

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: 1300,
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <LoaderContainer>
        <ProgressWithGradient id={gradientId} size={spinnerSize} thickness={thickness} />
      </LoaderContainer>
    </Backdrop>
  );
};

export default Loader;
