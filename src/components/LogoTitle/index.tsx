import { Container, Icon, Typography } from "../common";
import { BobIcon } from "../Icons";

const LogoTitle = () => {
  //
  return (
    <Container alignItems={"center"} padding={16}>
      <Icon size={"xl"}>
        <BobIcon />
      </Icon>
      <Typography fontSize={36} bold paddingLeft={16}>
        {"밥텍"}
      </Typography>
    </Container>
  );
};

export default LogoTitle;
