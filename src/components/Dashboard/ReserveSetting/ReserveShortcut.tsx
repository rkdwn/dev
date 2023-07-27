import { BobIcon, CalendarIcon, CancelReserveIcon } from "@/components/Icons";
import { Button, Container, Icon, Typography } from "@/components/common";
import { UserInfo } from "@/utils/DB";
import styled from "@emotion/styled";

const Title = styled(Container)(({ theme }) => ({
  padding: 8,
  alignItems: "center"
}));

const ReserveTile = styled(Container)<{ selected?: boolean }>(
  ({ theme, selected = false }) => ({
    flexDirection: "column",
    padding: 8,
    margin: 8,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: selected ? theme.palette.blueGray : "unset",
    cursor: "pointer"
  })
);

type Props = {
  userInfo: UserInfo | null;
  handleReserve: (type: boolean) => void;
};

const ReserveShortcut = (props: Props) => {
  const { userInfo, handleReserve } = props;
  //
  const reserveColor = userInfo?.wantToReserve ? "main" : "disabled";
  const cancelReserveColor = userInfo?.wantToReserve ? "disabled" : "main";

  const handleClick = (input: boolean) => {
    if (!userInfo || input === userInfo.wantToReserve) return;
    handleReserve(input);
  };

  return (
    <Container direction={"column"} padding={8}>
      <Title>
        <Icon>
          <CalendarIcon />
        </Icon>
        <Typography fontSize={24} bold>
          {"빠른 예약 / 취소"}
        </Typography>
      </Title>
      <Container padding={8}>
        <ReserveTile
          selected={userInfo?.wantToReserve}
          onClick={() => {
            handleClick(true);
          }}
        >
          <Typography fontSize={16} bold color={reserveColor}>
            {"예약"}
          </Typography>
          <Icon color={reserveColor} size={74}>
            <BobIcon />
          </Icon>
        </ReserveTile>
        <ReserveTile
          selected={!userInfo?.wantToReserve}
          onClick={() => {
            handleClick(false);
          }}
        >
          <Typography fontSize={16} bold color={cancelReserveColor}>
            {"예약 취소"}
          </Typography>
          <Icon color={cancelReserveColor} size={74}>
            <CancelReserveIcon />
          </Icon>
        </ReserveTile>
      </Container>
      <div>{"ReserveShortcut"}</div>
    </Container>
  );
};

export default ReserveShortcut;
