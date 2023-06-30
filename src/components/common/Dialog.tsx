import styled from "@emotion/styled";
import Container from "./Container";
import Button from "./Button";
import { CloseIcon } from "../Icons";
import Icon from "./Icon";
import { MouseEvent } from "react";

const StyledDialogBackdrop = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

type StyledDialogContainerProps = {
  width: React.CSSProperties["width"];
  height: React.CSSProperties["height"];
};
const StyledDialogContainer = styled("div")<StyledDialogContainerProps>(
  ({ theme, width, height }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: width,
    height: height,
    backgroundColor: theme.palette.secondDark,
    borderRadius: 8,
    padding: 8
  })
);

type DialogProps = {
  open: boolean;
  children?: React.ReactNode;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  onClose: () => void;
};

const Dialog = (props: DialogProps) => {
  const { open, width = "100%", height = "100%", onClose, children } = props;
  // TODO: 해당 컴포넌트 이외 부분 클릭 시 모달 닫히도록 구현
  if (!open) return null;
  const handleClickClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };
  return (
    <StyledDialogBackdrop onClick={onClose}>
      <StyledDialogContainer
        width={width}
        height={height}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Container fullWidth justifyContent={"flex-end"}>
          <Button variant={"icon"} onClick={handleClickClose}>
            <Icon>
              <CloseIcon />
            </Icon>
          </Button>
        </Container>
        {children}
      </StyledDialogContainer>
    </StyledDialogBackdrop>
  );
};

export default Dialog;
