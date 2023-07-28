import { UserIcon } from "@/components/Icons";
import { Container, Icon, Typography, TextField } from "@/components/common";
import { UserInfo } from "@/utils/DB";
import styled from "@emotion/styled";

const Title = styled(Container)(({ theme }) => ({
  padding: 8,
  alignItems: "center"
}));

type Props = {
  userInfo: UserInfo | null;
};

const UserInfo = (props: Props) => {
  const { userInfo } = props;

  //
  return (
    <Container direction={"column"} padding={8}>
      <Title>
        <Icon>
          <UserIcon />
        </Icon>
        <Typography fontSize={24} bold>
          {"User"}
        </Typography>
      </Title>
      <Container padding={8} justifyContent={"space-between"}>
        <Typography fontSize={14}>{"사번"}</Typography>
        <TextField
          width={200}
          disabled
          value={userInfo?.userId ?? ""}
          onChange={e => {}}
        />
      </Container>
      <Container padding={8} justifyContent={"space-between"}>
        <Typography fontSize={14}>{"닉네임"}</Typography>
        <TextField
          width={200}
          disabled
          value={userInfo?.username ?? ""}
          onChange={e => {}}
        />
      </Container>
    </Container>
  );
};

export default UserInfo;
