import { Container, Icon, Typography } from "@/components/common";
import styled from "@emotion/styled";
import { SearchMeals_searchMeals } from "api";
import Meals from "../Meals";
import { useEffect, useState } from "react";
import DB, { UserInfo } from "@/utils/DB";
import { ReserveIcon } from "@/components/Icons";
import Image from "next/image";

const Title = styled(Container)(({ theme }) => ({
  padding: 8,
  alignItems: "center"
}));

const ReserveStatusBox = styled(Container)(({ theme }) => ({
  position: "relative",
  width: "75%",
  height: "100%",
  overflow: "hidden",
  flexDirection: "column"
  // minWidth: 720
}));

const MealsContents = styled(Container)(({ theme }) => ({
  padding: 8,
  flexDirection: "column",
  overflowY: "scroll"
}));

type Props = {
  meals: SearchMeals_searchMeals[];
};

const ReserveStatus = (props: Props) => {
  const { meals } = props;
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

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

  useEffect(() => {
    if (userInfo) {
      setSelected(userInfo.id);
    }
  }, [userInfo]);
  //
  return (
    <ReserveStatusBox>
      <Title>
        <Icon>
          <ReserveIcon />
        </Icon>
        <Typography fontSize={24} bold>
          {"예약 대기 현황"}
        </Typography>
        <Typography fontSize={14} color={"gray"} paddingLeft={16}>
          {"현재 날짜 기준으로 다음 예약이 진행 될 리스트 입니다."}
        </Typography>
      </Title>
      <MealsContents>
        <Meals meals={null} />
        {meals.map(meal => {
          return (
            <Meals meals={meal} key={meal.id} selected={meal.id === selected} />
          );
        })}
      </MealsContents>
      <Container
        width={700}
        height={300}
        style={{
          position: "absolute",
          right: 0,
          bottom: 10,
          zIndex: -1
        }}
      >
        <Image src={"/group.png"} alt={""} fill objectFit="cover" />
      </Container>
    </ReserveStatusBox>
  );
};

export default ReserveStatus;
