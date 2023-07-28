import DB from "@/utils/DB";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { BobIcon, LogoutIcon } from "../Icons";
import { Button, Container, Icon, Typography } from "../common";

const StyledButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  right: 0,
  width: 86,
  backgroundColor: theme.palette.second,
  marginRight: 16
}));

const LogoTitle = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const db = new DB();
    await db.open();
    await db.clearUserInfo();
    router.push("/login");
  };
  //
  return (
    <Container
      alignItems={"center"}
      height={64}
      fullWidth
      justifyContent={"center"}
    >
      <Icon size={32} noPadding>
        <BobIcon />
      </Icon>
      <Typography fontSize={32} bold paddingLeft={8}>
        {"밥텍"}
      </Typography>
      {router.pathname !== "/login" && (
        <StyledButton onClick={handleLogout}>
          <Icon color={"white"} size={20} noPadding>
            <LogoutIcon />
          </Icon>
          <Typography fontSize={14} color={"white"} bold paddingLeft={4}>
            {"Logout"}
          </Typography>
        </StyledButton>
      )}
    </Container>
  );
};

export default LogoTitle;
