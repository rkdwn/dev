import styled from "@emotion/styled";
import { Container, Icon, Typography } from "@/components/common";
import { SearchMeals_searchMeals } from "api";
import { CloseIcon, CircleIcon } from "../Icons";

const MealContentBox = styled(Container)(({ theme }) => ({
  width: "100%",
  marginBottom: 8
}));

const MealBox = styled(Container)(({ theme }) => ({
  border: `1px solid ${theme.palette.mainDark}`,
  borderRadius: "5px",
  width: "100%",
  height: 52,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  padding: 4
}));

type Props = {
  meals: SearchMeals_searchMeals;
};

const Meals = (props: Props) => {
  const { meals } = props;
  return (
    <MealContentBox>
      <MealBox>
        <Container width={100} style={{ overflow: "hidden" }}>
          <Typography fontSize={20}>{meals.name}</Typography>
        </Container>
        <Typography fontSize={20}>{meals.mealType}</Typography>
        {meals.wantToReserve ? (
          <Icon color={"mainDark"}>
            <CircleIcon />
          </Icon>
        ) : (
          <Icon color={"mainDark"}>
            <CloseIcon />
          </Icon>
        )}
      </MealBox>
    </MealContentBox>
  );
};

export default Meals;
