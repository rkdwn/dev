import styled from "@emotion/styled";
import { Button, Container, Dialog, Icon, Typography } from "../common";
import {
  ReserveIcon,
  CancelReserveIcon,
  EditIcon,
  SettingIcon,
  HomeIcon
} from "../Icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DB, { UserInfo } from "@/utils/DB";
import { UPDATE_MEAL } from "@/queries/meal.queries";
import { useMutation } from "@apollo/client";
import { UpdateMeal, UpdateMealVariables } from "api";
import { useApiClient } from "@/contexts/ApolloContext";

const MenuBoxContents = styled(Container)(({ theme }) => ({
  width: "100%",
  padding: 8,
  alignItems: "center",
  justifyContent: "space-around"
}));

const TextContainer = styled(Container)(({ theme }) => ({
  color: theme.palette.main,
  flexDirection: "column"
}));

const MenuBox = () => {
  const router = useRouter();
  const client = useApiClient();

  const [openSetting, setOpenSetting] = useState<boolean>(false);
  // const [userId, setUserId] = useState<string | null>(null);
  const [curUser, setCurUser] = useState<UserInfo>();

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

  const [updateMeal] = useMutation<UpdateMeal, UpdateMealVariables>(
    UPDATE_MEAL,
    {
      client: client,
      onCompleted: () => {
        console.log("update meal success");
        if (router.pathname === "/") router.reload();
        else router.push("/");
      }
    }
  );

  const hanldeClickReserve = () => {
    if (!curUser) return;
    updateMeal({
      variables: {
        updateMealInput: {
          id: curUser.id,
          mealType: curUser.mealType,
          wantToReserve: true
        }
      }
    });
  };
  const handleClickCancleReserve = () => {
    if (!curUser) return;
    updateMeal({
      variables: {
        updateMealInput: {
          id: curUser.id,
          mealType: curUser.mealType,
          wantToReserve: false
        }
      }
    });
  };

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickEdit = () => {
    if (curUser) {
      router.push("/edit", { query: { id: curUser.userId } });
    }
  };

  const handleLogout = async () => {
    const db = new DB();
    await db.open();
    await db.clearUserInfo();
    router.push("/login");
  };

  return (
    <MenuBoxContents>
      <Button variant={"icon"} onClick={hanldeClickReserve}>
        <Icon size={"small"} color={"black"}>
          <ReserveIcon />
        </Icon>
      </Button>
      <Button variant={"icon"} onClick={handleClickCancleReserve}>
        <Icon size={"small"} color={"black"}>
          <CancelReserveIcon />
        </Icon>
      </Button>
      <Button variant={"icon"} onClick={handleClickHome}>
        <Icon size={"small"} color={"black"}>
          <HomeIcon />
        </Icon>
      </Button>
      <Button
        variant={"icon"}
        onClick={handleClickEdit}
        disabled={!curUser?.userId}
      >
        <Icon size={"small"} color={"black"}>
          <EditIcon color={!curUser?.userId ? "gray" : "black"} />
        </Icon>
      </Button>
      <Button variant={"icon"} onClick={() => setOpenSetting(true)}>
        <Icon size={"small"} color={"black"}>
          <SettingIcon />
        </Icon>
      </Button>
      {openSetting && (
        <Dialog
          open={openSetting}
          onClose={() => setOpenSetting(false)}
          width={"80%"}
          height={"15%"}
        >
          <TextContainer>
            <Typography>설정할거 없음~ 수구</Typography>
            <Button onClick={handleLogout}>{"로그아웃"}</Button>
          </TextContainer>
        </Dialog>
      )}
    </MenuBoxContents>
  );
};

export default MenuBox;
