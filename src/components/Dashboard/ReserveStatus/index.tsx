import { Container } from "@/components/common";
import { useApiClient } from "@/contexts/ApolloContext";
import { SEARCH_MEAL } from "@/queries/meal.queries";
import DB from "@/utils/DB";
import { useLazyQuery } from "@apollo/client";
import styled from "@emotion/styled";
import {
  SearchMeals_searchMeals,
  SearchMeals,
  SearchMealsVariables
} from "api";
import { useState, useEffect } from "react";
import Meals from "../Meals";

const ReserveStatusBox = styled(Container)(({ theme }) => ({
  width: "75%",
  height: "100%"
  // minWidth: 720
}));

const MealsContents = styled(Container)(({ theme }) => ({
  width: "100%",
  padding: 8,
  flexDirection: "column"
}));

const ReserveStatus = () => {
  const client = useApiClient();
  const [meals, setMeals] = useState<SearchMeals_searchMeals[]>([]);

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
  //
  return (
    <ReserveStatusBox>
      <MealsContents>
        <Meals meals={null} />
        {meals.map(meal => {
          return <Meals meals={meal} key={meal.id} />;
        })}
      </MealsContents>
    </ReserveStatusBox>
  );
};

export default ReserveStatus;
