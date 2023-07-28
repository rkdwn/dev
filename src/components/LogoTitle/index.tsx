import styled from "@emotion/styled";
import { Button, Container, Icon, Typography } from "../common";
import { BobIcon, LogoutIcon, SettingIcon } from "../Icons";

const StyledButton = styled(Button)(({ theme }) => ({
  position: "fixed",
  right: 0,
  width: 86,
  backgroundColor: theme.palette.second,
  marginRight: 16
}));

const LogoTitle = () => {
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
      <StyledButton>
        <Icon color={"white"} size={20} noPadding>
          <LogoutIcon />
        </Icon>
        <Typography fontSize={14} color={"white"} bold paddingLeft={4}>
          {"Logout"}
        </Typography>
      </StyledButton>
    </Container>
  );
};

export default LogoTitle;
