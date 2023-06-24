import styled from "@emotion/styled";
import { forwardRef } from "react";

interface ContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  direction?: React.CSSProperties["flexDirection"];
  alignItems?: React.CSSProperties["alignItems"];
  justifyContent?: React.CSSProperties["justifyContent"];
  fullHeight?: boolean;
  fullWidth?: boolean;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  padding?: React.CSSProperties["padding"];
}

const StyledContainer = styled("div")<ContainerProps>(
  ({
    theme,
    width,
    height,
    fullHeight,
    fullWidth,
    direction = "row",
    alignItems,
    justifyContent,
    padding
  }) => ({
    width: fullWidth ? "100%" : width ? width : undefined,
    height: fullHeight ? "100%" : height ? height : undefined,
    display: "flex",
    flexDirection: direction,
    alignItems: alignItems,
    justifyContent: justifyContent,
    padding: padding
  })
);

const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const { children, ...rest } = props;
  //
  return (
    <StyledContainer ref={ref} {...rest}>
      {children}
    </StyledContainer>
  );
});

Container.displayName = "Container";
export default Container;
