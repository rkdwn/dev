import { Container } from "@/components/common";
import { useApiClient } from "@/contexts/ApolloContext";
import { SEARCH_MEAL } from "@/queries/meal.queries";
import { useQuery } from "@apollo/client";
import {
  SearchMeals,
  SearchMealsVariables,
  SearchMeals_searchMeals
} from "api";
import { useState } from "react";
import LogoTitle from "../LogoTitle";
import Divider from "../common/Divider";
import ReserveSetting from "./ReserveSetting";
import ReserveStatus from "./ReserveStatus";

const Dashboard = () => {
  const client = useApiClient();
  const [meals, setMeals] = useState<SearchMeals_searchMeals[]>([]);

  const { refetch } = useQuery<SearchMeals, SearchMealsVariables>(SEARCH_MEAL, {
    client: client,
    variables: {
      searchMealsInput: {
        args: {}
      }
    },
    onCompleted: data => {
      setMeals(data.searchMeals);
    },
    onError(error) {
      console.log("error", error);
    }
  });

  const handleRefetch = () => {
    refetch();
  };

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
        <ReserveStatus meals={meals} />
        <Divider direction={"column"} size={"100%"} />
        <ReserveSetting handleRefetch={handleRefetch} />
      </Container>
    </Container>
  );
};

export default Dashboard;
