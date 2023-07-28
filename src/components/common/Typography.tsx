import { ColorType } from "@/theme/palette";
import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

type StyledTypographyProps = {
  color?: ColorType | "inherit" | "white" | "black" | "disabled" | "default";
  bold?: boolean;
  fontSize?: React.CSSProperties["fontSize"];
  wrap?: React.CSSProperties["whiteSpace"];
  paddingLeft?: React.CSSProperties["paddingLeft"];
  userSelect?: React.CSSProperties["userSelect"];
  textAlign?: React.CSSProperties["textAlign"];
  textDecoration?: React.CSSProperties["textDecoration"];
};

const getBold = (bold?: boolean) => {
  if (bold) return { fontWeight: "bold" };
  return {};
};

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
    case "error":
      return theme.palette.error;
    case "second":
      return theme.palette.second;
    case "mainDark":
      return theme.palette.mainDark;
    case "lightGray":
      return theme.palette.lightGray;
    case "main":
      return theme.palette.main;
    case "gray":
      return theme.palette.gray;
    default:
      return "black";
  }
};

const StyledTypography = styled("span")<StyledTypographyProps>(
  ({
    theme,
    bold = false,
    color = "inherit",
    wrap,
    fontSize = 24,
    paddingLeft = 0,
    userSelect,
    textAlign,
    textDecoration
  }) => ({
    fontStretch: "normal",
    fontStyle: "normal",
    color: getColor(theme, color),
    margin: 0,
    paddingLeft,
    fontFamily: "Noto Sans",
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    fontSize: fontSize,
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "normal",
    whiteSpace: wrap,
    userSelect,
    textAlign,
    textDecoration,
    marginTop: 4,
    marginBottom: 4,
    ...getBold(bold)
  })
);

export interface TyphographyProps extends React.ComponentProps<"span"> {
  color?: ColorType | "inherit" | "white" | "black" | "disabled" | "default";
  bold?: boolean;
  fontSize?: React.CSSProperties["fontSize"];
  wrap?: React.CSSProperties["whiteSpace"];
  paddingLeft?: React.CSSProperties["paddingLeft"];
  userSelect?: React.CSSProperties["userSelect"];
  textAlign?: React.CSSProperties["textAlign"];
  textDecoration?: React.CSSProperties["textDecoration"];
}

const Typography = (props: TyphographyProps) => {
  const {
    children,
    color = "inherit",
    bold = false,
    wrap,
    paddingLeft,
    ...others
  } = props;
  return (
    <StyledTypography
      color={color}
      bold={bold}
      wrap={wrap}
      paddingLeft={paddingLeft}
      {...others}
    >
      {children}
    </StyledTypography>
  );
};

export default Typography;
