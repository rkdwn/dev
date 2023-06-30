import styled from "@emotion/styled";
import { Button, Container, Typography } from "../common";
import DB, { UserInfo } from "@/utils/DB";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UpdateMeal, UpdateMealVariables } from "api";
import { UPDATE_MEAL } from "@/queries/meal.queries";
import { useApiClient } from "@/contexts/ApolloContext";
import { useRouter } from "next/router";

const ContentsBox = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100%",
  flexDirection: "column",
  color: theme.palette.main,
  justifyContent: "space-between"
}));

const EditContents = () => {
  const [curUser, setCurUser] = useState<UserInfo>();

  const client = useApiClient();
  const router = useRouter();

  const [updateMeal] = useMutation<UpdateMeal, UpdateMealVariables>(
    UPDATE_MEAL,
    {
      client: client,
      onCompleted: () => {
        console.log("update meal success");
        router.push("/");
      }
    }
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      const db = new DB();
      await db.open();
      const _result = await db.getCurUserInfo();
      if (_result.result) {
        setCurUser(_result.data);
      }
    };
    fetchUserInfo();
  }, []);

  const handleClickMealType = (mealType: ScalarMealType) => {
    if (curUser) {
      setCurUser({ ...curUser, mealType: mealType });
    }
  };
  const handleClickWantToReserve = (wantToReserve: boolean) => {
    if (curUser) {
      setCurUser({ ...curUser, wantToReserve: wantToReserve });
    }
  };

  const handleSave = async () => {
    if (curUser) {
      updateMeal({
        variables: {
          updateMealInput: {
            id: curUser.id,
            mealType: curUser.mealType,
            wantToReserve: curUser.wantToReserve
          }
        }
      });
      const db = new DB();
      await db.open();
      await db.createUserInfo(curUser);
    }
  };

  if (!curUser) return <></>;
  return (
    <ContentsBox>
      <Container direction={"column"}>
        <Typography fontSize={20}>{"Meal Type"}</Typography>
        <Container>
          <Button
            color={curUser.mealType === "A" ? "main" : "gray"}
            onClick={() => handleClickMealType("A")}
          >
            {"A"}
          </Button>
          <Button
            color={curUser.mealType === "B" ? "main" : "gray"}
            onClick={() => handleClickMealType("B")}
          >
            {"B"}
          </Button>
          <Button
            color={curUser.mealType === "C" ? "main" : "gray"}
            onClick={() => handleClickMealType("C")}
          >
            {"C"}
          </Button>
        </Container>
        <Typography fontSize={20}>{"에약 여부"}</Typography>
        <Container>
          <Button
            color={curUser.wantToReserve ? "main" : "gray"}
            onClick={() => handleClickWantToReserve(true)}
          >
            {"예약 할거"}
          </Button>
          <Button
            color={!curUser.wantToReserve ? "main" : "gray"}
            onClick={() => handleClickWantToReserve(false)}
          >
            {"예약 안함"}
          </Button>
        </Container>
      </Container>
      <Button onClick={handleSave}>{"저장"}</Button>
    </ContentsBox>
  );
};

export default EditContents;
