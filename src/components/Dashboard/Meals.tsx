import styled from "@emotion/styled";
import { Container, Icon, Typography } from "@/components/common";
import { SearchMeals_searchMeals } from "api";
import { CloseIcon, CircleIcon } from "../Icons";

const MealContentBox = styled(Container)(({ theme }) => ({
  width: "100%",
  marginBottom: 8
}));

const MealBox = styled(Container)<{ isHeader?: boolean }>(
  ({ theme, isHeader = false }) => ({
    border: `1px solid ${
      isHeader ? theme.palette.blueGray : theme.palette.mainDark
    }`,
    borderRadius: "5px",
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 4,
    backgroundColor: isHeader ? theme.palette.blueGray : "unset"
  })
);

const MealTypograpy = styled(Typography)(({ theme }) => ({
  fontSize: 20
}));

const HeadTypograpy = styled(Typography)(({ theme }) => ({
  fontSize: 24
}));

type Props = {
  meals: SearchMeals_searchMeals | null;
};

const Meals = (props: Props) => {
  const { meals } = props;
  if (!meals) {
    return (
      <MealContentBox>
        <MealBox isHeader>
          <Container width={100} style={{ overflow: "hidden" }}>
            <HeadTypograpy>{"이름"}</HeadTypograpy>
          </Container>
          <HeadTypograpy>{"메뉴"}</HeadTypograpy>
          <HeadTypograpy>{"예약 여부"}</HeadTypograpy>
        </MealBox>
      </MealContentBox>
    );
  }
  return (
    <MealContentBox>
      <MealBox>
        <Container width={100} style={{ overflow: "hidden" }}>
          <MealTypograpy>{meals.name}</MealTypograpy>
        </Container>
        <MealTypograpy>{meals.mealType}</MealTypograpy>
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
