import { Container, Dialog, Typography } from "@/components/common";
import Divider from "@/components/common/Divider";
import { useApiClient } from "@/contexts/ApolloContext";
import { UPDATE_MEAL } from "@/queries/meal.queries";
import DB from "@/utils/DB";
import { useMutation } from "@apollo/client";
import { UpdateMeal, UpdateMealVariables } from "api";
import { useEffect, useState } from "react";
import ReserveShortcut from "./ReserveShortcut";
import UserInfo from "./UserInfo";
import ChangeSetting from "./ChangeSetting";

type Props = {
  handleRefetch: () => void;
};

const ReserveSetting = (props: Props) => {
  const { handleRefetch } = props;

  const client = useApiClient();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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

  const [updateMeal] = useMutation<UpdateMeal, UpdateMealVariables>(
    UPDATE_MEAL,
    {
      client: client,
      onCompleted: () => {
        console.log("update meal success");
        handleRefetch();
      }
    }
  );

  const handleReserve = async (type: boolean) => {
    if (userInfo) {
      await updateMeal({
        variables: {
          updateMealInput: {
            id: userInfo.id,
            mealType: userInfo.mealType,
            wantToReserve: type
          }
        }
      });
      const db = new DB();
      await db.open();
      await db.upsertUserInfo({ ...userInfo, wantToReserve: type });
      setUserInfo({ ...userInfo, wantToReserve: type });
    }
  };

  const handleChangeSetting = async (
    course: ScalarMealType,
    wantReserve: boolean
  ) => {
    if (userInfo) {
      await updateMeal({
        variables: {
          updateMealInput: {
            id: userInfo.id,
            mealType: course,
            wantToReserve: wantReserve
          }
        }
      });
      const db = new DB();
      await db.open();
      await db.upsertUserInfo({
        ...userInfo,
        mealType: course,
        wantToReserve: wantReserve
      });
      setUserInfo({
        ...userInfo,
        mealType: course,
        wantToReserve: wantReserve
      });
      setOpenDialog(true);
    }
  };
  //
  return (
    <Container direction={"column"} width={"25%"}>
      <UserInfo userInfo={userInfo} />
      <Divider direction={"row"} size={"100%"} />
      <ReserveShortcut userInfo={userInfo} handleReserve={handleReserve} />
      <Divider direction={"row"} size={"100%"} />
      <ChangeSetting
        userInfo={userInfo}
        handleChangeSetting={handleChangeSetting}
      />
      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          width={150}
          height={50}
        >
          <Container padding={8}>
            <Typography fontSize={16} bold>
              {"저장 완료!"}
            </Typography>
          </Container>
        </Dialog>
      )}
    </Container>
  );
};

export default ReserveSetting;
