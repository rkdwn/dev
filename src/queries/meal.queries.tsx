import { gql } from "@apollo/client";

const GET_MEAL = gql`
  query GetMeal($findOneInput: DeleteMealInput!) {
    getMeal(findOneInput: $findOneInput) {
      id
      name
      email
      loginId
      loginPassword
      mealType
      wantToReserve
    }
  }
`;

const SEARCH_MEAL = gql`
  query SearchMeals($searchMealsInput: SearchMealInput!) {
    searchMeals(searchMealsInput: $searchMealsInput) {
      id
      name
      email
      loginId
      loginPassword
      mealType
      wantToReserve
      createdAt
      updatedAt
    }
  }
`;

const CREATE_MEAL = gql`
  mutation CreateMeal($createMealInput: CreateMealInput!) {
    createMeal(createMealInput: $createMealInput) {
      id
    }
  }
`;

const UPDATE_MEAL = gql`
  mutation UpdateMeal($updateMealInput: UpdateMealInput!) {
    updateMeal(updateMealInput: $updateMealInput) {
      id
    }
  }
`;

const DELETE_MEAL = gql`
  mutation DeleteMeal($deleteMealInput: DeleteMealInput!) {
    deleteMeal(deleteMealInput: $deleteMealInput) {
      id
    }
  }
`;

export { GET_MEAL, SEARCH_MEAL, CREATE_MEAL, UPDATE_MEAL, DELETE_MEAL };
