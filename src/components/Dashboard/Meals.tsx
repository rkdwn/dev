import { Container, Typography } from "@/components/common";
import styled from "@emotion/styled";
import { SearchMeals_searchMeals } from "api";

const MealContentBox = styled(Container)(({ theme }) => ({
  width: "100%",
  marginBottom: 8
}));

const MealBox = styled(Container)<{ isHeader?: boolean; isSelected?: boolean }>(
  ({ theme, isHeader = false, isSelected = false }) => ({
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
    backgroundColor: isHeader
      ? theme.palette.blueGray
      : isSelected
      ? theme.palette.second
      : "unset"
  })
);

const MealContainer = styled(Container)(({ theme }) => ({
  width: "33%",
  justifyContent: "center",
  alignItems: "center"
}));
const MealTypograpy = styled(Typography)(({ theme }) => ({
  fontSize: 16
}));

const HeaderContainer = styled(Container)(({ theme }) => ({
  width: "33%",
  justifyContent: "center",
  alignItems: "center"
}));
const HeadTypograpy = styled(Typography)(({ theme }) => ({
  fontSize: 20
}));

type Props = {
  meals: SearchMeals_searchMeals | null;
  selected?: boolean;
};

const Meals = (props: Props) => {
  const { meals, selected } = props;
  if (!meals) {
    return (
      <MealContentBox>
        <MealBox isHeader>
          <HeaderContainer style={{ overflow: "hidden" }}>
            <HeadTypograpy>{"이름"}</HeadTypograpy>
          </HeaderContainer>
          <HeaderContainer>
            <HeadTypograpy>{"메뉴"}</HeadTypograpy>
          </HeaderContainer>
          <HeaderContainer>
            <HeadTypograpy>{"예약 여부"}</HeadTypograpy>
          </HeaderContainer>
        </MealBox>
      </MealContentBox>
    );
  }
  return (
    <MealContentBox>
      <MealBox isSelected={selected}>
        <MealContainer style={{ overflow: "hidden" }}>
          <MealTypograpy>{meals.name}</MealTypograpy>
        </MealContainer>
        <MealContainer>
          <MealTypograpy>{meals.mealType}</MealTypograpy>
        </MealContainer>
        {meals.wantToReserve ? (
          <MealContainer>
            <MealTypograpy>{"O"}</MealTypograpy>
          </MealContainer>
        ) : (
          <MealContainer>
            <MealTypograpy>{"X"}</MealTypograpy>
          </MealContainer>
        )}
      </MealBox>
    </MealContentBox>
  );
};

export default Meals;
