import { Container } from "@/components/common";
import LogoTitle from "../LogoTitle";
import Divider from "../common/Divider";
import ReserveStatus from "./ReserveStatus";
import ReserveSetting from "./ReserveSetting";

const Dashboard = () => {
  return (
    <Container
      width={"100vw"}
      height={"100vh"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <LogoTitle />
      <Divider direction={"row"} size={"100%"} />
      <Container fullWidth height={"calc(100% - 64px)"} direction={"row"}>
        <ReserveStatus />
        <Divider direction={"column"} size={"100%"} />
        <ReserveSetting />
      </Container>
    </Container>
  );
};

export default Dashboard;
