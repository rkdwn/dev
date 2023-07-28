import { UserInfo } from "@/utils/DB";
import { SearchMeals_searchMeals } from "api";

type State = {
  meals: SearchMeals_searchMeals[];
  user: UserInfo;
};
