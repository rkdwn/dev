/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMeal
// ====================================================

export interface GetMeal_getMeal {
  /**
   * id value
   */
  id: string;
  /**
   * user's name
   */
  name: string;
  /**
   * user email
   */
  email: string | null;
  /**
   * user loginId
   */
  loginId: string;
  /**
   * user password
   */
  loginPassword: string;
  /**
   * meal type whitch user want to reserve
   */
  mealType: ScalarMealType;
  /**
   * flag which means want to reserve
   */
  wantToReserve: boolean;
}

export interface GetMeal {
  getMeal: GetMeal_getMeal;
}

export interface GetMealVariables {
  findOneInput: DeleteMealInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchMeals
// ====================================================

export interface SearchMeals_searchMeals {
  /**
   * id value
   */
  id: string;
  /**
   * user's name
   */
  name: string;
  /**
   * user email
   */
  email: string | null;
  /**
   * user loginId
   */
  loginId: string;
  /**
   * user password
   */
  loginPassword: string;
  /**
   * meal type whitch user want to reserve
   */
  mealType: ScalarMealType;
  /**
   * flag which means want to reserve
   */
  wantToReserve: boolean;
  createdAt: DateTime;
  updatedAt: DateTime | null;
}

export interface SearchMeals {
  searchMeals: SearchMeals_searchMeals[];
}

export interface SearchMealsVariables {
  searchMealsInput: SearchMealInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMeal
// ====================================================

export interface CreateMeal_createMeal {
  /**
   * id value
   */
  id: string;
}

export interface CreateMeal {
  createMeal: CreateMeal_createMeal;
}

export interface CreateMealVariables {
  createMealInput: CreateMealInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMeal
// ====================================================

export interface UpdateMeal_updateMeal {
  /**
   * id value
   */
  id: string;
}

export interface UpdateMeal {
  updateMeal: UpdateMeal_updateMeal;
}

export interface UpdateMealVariables {
  updateMealInput: UpdateMealInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteMeal
// ====================================================

export interface DeleteMeal_deleteMeal {
  /**
   * id value
   */
  id: string;
}

export interface DeleteMeal {
  deleteMeal: DeleteMeal_deleteMeal;
}

export interface DeleteMealVariables {
  deleteMealInput: DeleteMealInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateMealInput {
  name?: string | null;
  email?: string | null;
  loginId: string;
  loginPassword: string;
  mealType: ScalarMealType;
  wantToReserve?: boolean | null;
}

export interface DateInput {
  begin?: DateTime | null;
  end?: DateTime | null;
}

export interface DeleteMealInput {
  id: string;
}

export interface InputSort {
  indexKey?: string | null;
  order?: boolean | null;
}

export interface MealArgsInput {
  name?: string | null;
  email?: string | null;
  loginId?: string | null;
  mealType?: ScalarMealType | null;
  wantToReserve?: boolean | null;
  createdAt?: DateInput | null;
  updatedAt?: DateInput | null;
}

export interface SearchMealInput {
  comparison?: ScalarComparison | null;
  exact?: boolean | null;
  sort?: InputSort | null;
  args: MealArgsInput;
}

export interface UpdateMealInput {
  name?: string | null;
  email?: string | null;
  loginId?: string | null;
  loginPassword?: string | null;
  mealType?: ScalarMealType | null;
  wantToReserve?: boolean | null;
  id: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
