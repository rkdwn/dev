import { Container } from "@/components/common";
import Divider from "@/components/common/Divider";
import ReserveShortcut from "./ReserveShortcut";
import UserInfo from "./UserInfo";
import DB from "@/utils/DB";
import { useState, useEffect } from "react";

const ReserveSetting = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const db = new DB();
      await db.open();
      const _userInfo = await db.getCurUserInfo();
      if (!_userInfo.result) return;
      setUserInfo(_userInfo.data);
    };
    fetchData();
  }, []);

  const handleReserve = (type: boolean) => {
    //
  };
  //
  return (
    <Container direction={"column"} width={"25%"}>
      <UserInfo userInfo={userInfo} />
      <Divider direction={"row"} size={"100%"} />
      <ReserveShortcut userInfo={userInfo} handleReserve={handleReserve} />
      <Divider direction={"row"} size={"100%"} />
    </Container>
  );
};

export default ReserveSetting;
