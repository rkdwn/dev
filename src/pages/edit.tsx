import EditContents from "@/components/EditContents";
import { InfoIcon } from "@/components/Icons";
import {
  Button,
  Container,
  Dialog,
  Icon,
  Typography
} from "@/components/common";
import styled from "@emotion/styled";
import { useState } from "react";

const Title = styled(Container)(({ theme }) => ({
  width: "100vw",
  height: 52,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.main
}));

const EditInfoContents = styled(Container)(({ theme }) => ({
  height: "calc(100% - 106px)",
  padding: 8,
  flexDirection: "column"
}));

const InfoContainer = styled(Container)(({ theme }) => ({
  color: theme.palette.main,
  padding: 8,
  flexDirection: "column"
}));

const Edit = () => {
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const handleClickInfo = () => {
    setOpenInfo(true);
  };
  return (
    <Container
      width={"100vw"}
      height={"calc(100vh - 64px)"}
      direction={"column"}
    >
      <Title>
        <Typography>{"대기 설정 변경"}</Typography>
        <Button variant={"icon"} onClick={handleClickInfo}>
          <Icon size={"xs"}>
            <InfoIcon />
          </Icon>
        </Button>
      </Title>
      <EditInfoContents>
        <EditContents />
      </EditInfoContents>
      {openInfo && (
        <Dialog
          open={openInfo}
          onClose={() => setOpenInfo(false)}
          width={"80%"}
          height={"20%"}
        >
          <InfoContainer>
            <Typography fontSize={16}>
              {"다음 예약에 반영될 설정을 진행하는 페이지 입니다."}
            </Typography>
            <Typography fontSize={16}>
              {"변경 후 저장버튼을 누르지 않으면 저장되지 않습니다!"}
            </Typography>
          </InfoContainer>
        </Dialog>
      )}
    </Container>
  );
};

export default Edit;
