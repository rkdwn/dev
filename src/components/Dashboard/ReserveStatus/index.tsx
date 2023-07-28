import { Container } from "@/components/common";
import styled from "@emotion/styled";
import { SearchMeals_searchMeals } from "api";
import Meals from "../Meals";
import { useEffect, useState } from "react";
import DB, { UserInfo } from "@/utils/DB";

const ReserveStatusBox = styled(Container)(({ theme }) => ({
  width: "75%",
  height: "100%",
  overflow: "hidden"
  // minWidth: 720
}));

const MealsContents = styled(Container)(({ theme }) => ({
  width: "100%",
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
      <MealsContents>
        <Meals meals={null} />
        {meals.map(meal => {
          return (
            <Meals meals={meal} key={meal.id} selected={meal.id === selected} />
          );
        })}
      </MealsContents>
    </ReserveStatusBox>
  );
};

export default ReserveStatus;
