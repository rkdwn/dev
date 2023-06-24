import { Theme } from "@emotion/react";
import styled from "@emotion/styled";
import React, { forwardRef, memo, ReactNode } from "react";
import { ColorType } from "@/theme/palette";
import { shouldForwardProp } from "@/utils/emotion";

type Size = "xs" | "small" | "medium" | "large" | "xl" | number;

interface IconProps {
  className?: any;
  children: ReactNode;
  color?: ColorType | "inherit" | "white" | "black" | "disabled" | "default";
  noPadding?: boolean;
  size?: Size;
  pointerEvents?: React.CSSProperties["pointerEvents"];
  onClick?: () => void;
}

function getSize(size: Size) {
  if (typeof size === "number") return { height: size, width: size };

  if (size === "xs") {
    return { height: 16, width: 16 };
  } else if (size === "small") {
    return { height: 20, width: 20 };
  } else if (size === "medium") {
    return { height: 24, width: 24 };
  } else if (size === "large") {
    return { height: 28, width: 28 };
  } else if (size === "xl") {
    return { height: 32, width: 32 };
  }

  return { height: 20, width: 20 };
}

const getColor = (
  theme: Theme,
  color: ColorType | "inherit" | "white" | "black" | "disabled" | "default"
) => {
  switch (color) {
    case "white":
      return "white";
    case "black":
      return "black";
    case "inherit":
      return color;
    case "disabled":
      return theme.palette.gray;
    default:
      return theme.palette.main;
  }
};

const StyledIcon = styled("div", {
  shouldForwardProp: shouldForwardProp(["color", "noPadding"])
})<IconProps>(
  ({ theme, color = "default", noPadding = false, pointerEvents }) => {
    return {
      display: "inline-flex",
      padding: noPadding ? 0 : 8,
      color: getColor(theme, color),
      pointerEvents: pointerEvents,
      alignItems: "center"
    };
  }
);

const Icon = forwardRef<HTMLDivElement, IconProps>((props, ref) => {
  const {
    size = "medium",
    noPadding = false,
    children,
    color = "default",
    ...others
  } = props;

  return (
    <StyledIcon noPadding={noPadding} color={color} {...others} ref={ref}>
      {React.isValidElement(children) &&
        React.cloneElement(children, { ...getSize(size) })}
    </StyledIcon>
  );
});

Icon.displayName = "Icon";

export default memo(Icon);
