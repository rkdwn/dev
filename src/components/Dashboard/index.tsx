import {
  Button,
  Container,
  Dialog,
  Icon,
  Typography
} from "@/components/common";
import { useApiClient } from "@/contexts/ApolloContext";
import { SEARCH_MEAL } from "@/queries/meal.queries";
import DB from "@/utils/DB";
import { useLazyQuery } from "@apollo/client";
import styled from "@emotion/styled";
import {
  SearchMeals,
  SearchMealsVariables,
  SearchMeals_searchMeals
} from "api";
import { useEffect, useState } from "react";
import { CancelReserveIcon, InfoIcon, ReserveIcon } from "../Icons";
import Meals from "./Meals";

const Title = styled(Container)(({ theme }) => ({
  width: "100vw",
  height: 52,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.main
}));

const MealsContents = styled(Container)(({ theme }) => ({
  height: "calc(100% - 106px)",
  padding: 8,
  flexDirection: "column"
}));

const InfoContainer = styled(Container)(({ theme }) => ({
  color: theme.palette.main,
  padding: 8,
  flexDirection: "column"
}));

const Dashboard = () => {
  const client = useApiClient();
  const [meals, setMeals] = useState<SearchMeals_searchMeals[]>([]);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [getMeals] = useLazyQuery<SearchMeals, SearchMealsVariables>(
    SEARCH_MEAL,
    {
      client: client,
      variables: {
        searchMealsInput: {
          args: {}
        }
      },
      onCompleted: data => {
        console.log("data", data.searchMeals);
        setMeals(data.searchMeals);
      },
      onError(error) {
        console.log("error", error);
      }
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      const db = new DB();
      await db.open();
      const _userInfo = await db.getCurUserInfo();
      if (!_userInfo.result) return;
      getMeals();
    };
    fetchData();
  }, []);

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
        <Typography>{"예약 대기 현황"}</Typography>
        <Button variant={"icon"} onClick={handleClickInfo}>
          <Icon size={"xs"} color={"secondDark"}>
            <InfoIcon />
          </Icon>
        </Button>
      </Title>
      <MealsContents>
        {meals.map(meal => {
          return <Meals meals={meal} key={meal.id} />;
        })}
      </MealsContents>
      {openInfo && (
        <Dialog
          open={openInfo}
          onClose={() => setOpenInfo(false)}
          width={"80%"}
          height={"30%"}
        >
          <InfoContainer>
            <Typography fontSize={14}>
              현재 날짜 기준으로 다음 예약이 진행 될 리스트 입니다.
            </Typography>
            <Container padding={`16px 0`}>
              <Typography fontSize={14}>
                순서대로 각각 예약자이름, 예약 코스, 예약 진행여부를 나타냅니다.
              </Typography>
            </Container>
            <Typography fontSize={14}>
              수정을 원한다면 아래 메뉴 수정 버튼을 눌러주세요.
            </Typography>
            <Container alignItems={"center"}>
              <Typography fontSize={14}>빠른 취소는</Typography>
              <Icon size={"xs"}>
                <ReserveIcon />
              </Icon>
              <Typography fontSize={14}>아이콘을, </Typography>
            </Container>
            <Container alignItems={"center"}>
              <Typography fontSize={14}>빠른 예약은</Typography>
              <Icon size={"xs"}>
                <CancelReserveIcon />
              </Icon>
              <Typography fontSize={14}>아이콘을 누르면 됩니다.</Typography>
            </Container>
          </InfoContainer>
        </Dialog>
      )}
    </Container>
  );
};

export default Dashboard;
