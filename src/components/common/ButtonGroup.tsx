import styled from "@emotion/styled";
import Button from "./Button";

const StyledButtonGroup = styled("div")<{
  divider?: boolean;
  direction?: "column" | "row";
  noMargin?: boolean;
  selectedIndex?: number;
  selectedBgColor?: string;
  selectedColor?: string;
}>(
  ({
    theme,
    divider = false,
    direction = "row",
    noMargin,
    selectedIndex = -1,
    selectedBgColor,
    selectedColor
  }) => ({
    margin: noMargin ? 0 : 8,
    display: "flex",
    flexDirection: direction,
    whiteSpace: "nowrap",

    ["> button"]: {
      margin: 0,
      borderRadius: 0,
      fontSize: 14,
      border: `0.1px solid ${theme.palette.gray}`,
      backgroundColor: theme.palette.blueGray,
      color: theme.palette.gray
    },
    [`> button:not(:nth-of-type(${selectedIndex + 1}))`]: {
      backgroundColor: theme.palette.blueGray,
      color: theme.palette.gray
    },
    [`> button:nth-of-type(${selectedIndex + 1})`]: {
      backgroundColor: selectedBgColor || theme.palette.mainDark,
      color: selectedColor || "white"
    },
    [`> button:first-of-type`]: {
      borderRadius: direction === "row" ? `8px 0 0 8px` : `8px 8px 0 0`
    },
    ["> button:not(:first-of-type)"]: {
      [`${direction === "row" ? "marginLeft" : "marginTop"}`]: -1,
      borderLeft: divider ? `0.1px solid ${theme.palette.gray}` : undefined
    },
    ["> button:last-of-type"]: {
      borderRadius: direction === "row" ? `0 8px 8px 0` : `0 0 8px 8px`
    }
  })
);

export interface ButtonGroupProps {
  list?: {
    label?: string;
  }[];
  width?: number;
  selectedIndex?: number;
  selectedBgColor?: string;
  selectedColor?: string;
  onChange?: (index: number) => void;
  noMargin?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  divider?: boolean;
}

const ButtonGroup = (props: ButtonGroupProps) => {
  const {
    list = [],
    selectedIndex,
    onChange = () => {},
    selectedBgColor,
    selectedColor,
    noMargin,
    fullWidth,
    width,
    divider,
    ...others
  } = props;

  const onClickButton = (index: number) => () => {
    onChange(index);
  };

  return (
    <StyledButtonGroup
      divider={divider}
      selectedIndex={selectedIndex}
      selectedBgColor={selectedBgColor}
      selectedColor={selectedColor}
      noMargin={noMargin}
    >
      {list.map((el, index) => {
        return (
          <Button
            width={
              fullWidth
                ? `calc(100% / ${list.length})`
                : !!width
                ? `calc(${width}px / ${list.length})`
                : undefined
            }
            onClick={onClickButton(index)}
            key={index}
            variant={"text"}
            {...others}
            style={{ flexGrow: fullWidth ? 1 : undefined }}
          >
            {el.label}
          </Button>
        );
      })}
    </StyledButtonGroup>
  );
};

export default ButtonGroup;
