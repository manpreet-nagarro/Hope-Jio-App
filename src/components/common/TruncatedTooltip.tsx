import  { useRef, useState, useLayoutEffect } from "react";
import { Tooltip } from "@mui/material";
import type { TooltipProps } from "@mui/material";

interface TruncatedTooltipProps {
  text: string;
  lines?: number;
  forceOpen?: boolean;
  placement?: TooltipProps["placement"];
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tooltipSx?: React.CSSProperties;
  arrowColor?: string;
}

const TruncatedTooltip: React.FC<TruncatedTooltipProps> = ({
  text,
  lines = 2,
  forceOpen = false,
  placement = "top",
  children,
  className,
  style,
  tooltipSx,
  arrowColor = "#061951",
}) => {
  const spanRef = useRef<HTMLButtonElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useLayoutEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const check = () => {
      const truncated =
        el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
      setIsTruncated(truncated);
    };

    check();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(check);
      ro.observe(el);
    }

    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      if (ro) ro.disconnect();
    };
  }, [text, lines]);

  const content = (
    <button
      ref={spanRef}
      className={className}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "normal",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
        outline: "none",
        border: "none",
        background: "none",
        ...style,
      }}
    >
      {children ?? text}
    </button>
  );

  return (
    <Tooltip
      title={text}
      open={isTruncated && (isHover || forceOpen)}
      placement={placement}
      arrow
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: tooltipSx?.backgroundColor ?? "#061951",
            color: tooltipSx?.color ?? "#ffffff",
            opacity: tooltipSx?.opacity ?? 1,
            ...tooltipSx,
          },
        },
        arrow: {
          sx: {
            color: arrowColor,
          },
        },
      }}
    >
      {content}
    </Tooltip>
  );
};

export default TruncatedTooltip;
