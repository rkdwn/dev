"use client";

import { useApiClient } from "@/contexts/ApolloContext";
import { CREATE_MEAL, SEARCH_MEAL } from "@/queries/meal.queries";
import DB from "@/utils/DB";
import { useLazyQuery, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import {
  CreateMeal,
  CreateMealVariables,
  SearchMeals,
  SearchMealsVariables
} from "api";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Dialog, Typography } from "../common";
import TextField from "../common/TextField";

const Title = styled(Container)(({ theme }) => ({
  width: "100%",
  height: 52,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.main
}));

const LoginBox = styled(Container)(({ theme }) => ({
  margin: 16,
  padding: 8,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  backgroundColor: theme.palette.main,
  flexDirection: "column"
}));

const InputContainer = styled(Container)(({ theme }) => ({
  width: "100%",
  flexDirection: "column",
  padding: "8px 0"
}));

const ButtonBox = styled(Container)(({ theme }) => ({
  width: "100%",
  position: "fixed",
  flexDirection: "column",
  justifyContent: "space-around",
  bottom: 0,
  height: 100
}));

const WarnDialogContainer = styled(Container)(({ theme }) => ({
  color: theme.palette.main,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}));

type InputsType = {
  userId: string;
  password: string;
  name: string;
  mealType: ScalarMealType;
  email?: string;
};
const INIT_INPUTS: InputsType = {
  userId: "",
  password: "",
  mealType: "B",
  name: ""
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [inputs, setInputs] = useState<InputsType>(INIT_INPUTS);
  const [openInputWarn, setOpenInputWarn] = useState(false);
  const [dupKeyWarn, setDupKeyWarn] = useState(false);

  const client = useApiClient();
  const router = useRouter();

  const [searchMeal] = useLazyQuery<SearchMeals, SearchMealsVariables>(
    SEARCH_MEAL,
    {
      client: client
    }
  );

  const onLogin = async () => {
    const _result = await searchMeal({
      variables: {
        searchMealsInput: {
          args: {
            loginId: inputs.userId
          }
        }
      }
    });
    const _meal = _result.data?.searchMeals[0];
    if (!_meal) {
      alert("존재하지 않는 아이디입니다.");
      return;
    }
    if (_meal.loginPassword !== inputs.password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 로그인 성공
    const db = new DB();
    await db.open();
    const _createResult = await db.createUserInfo({
      id: _meal.id,
      userId: _meal.loginId,
      username: _meal.name,
      mealType: _meal.mealType,
      wantToReserve: _meal.wantToReserve
    });
    if (!_createResult.result) {
      alert("유저정보 확인 실패");
      return;
    }
    router.push("/");
  };

  const [createMeal] = useMutation<CreateMeal, CreateMealVariables>(
    CREATE_MEAL,
    {
      client: client,
      onCompleted: () => {
        handleToggleSignUp();
      },
      onError: error => {
        const errorCode = error.graphQLErrors[0].message;
        // TODO: FIXME: error code should be setted by backend
        if (errorCode.split(" ").some(item => item.includes("duplicate"))) {
          setDupKeyWarn(true);
        }
      }
    }
  );

  const filterString = (input: string) => {
    return input.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
  };

  const validateInputs = () => {
    if (isSignUp) {
      //validate all inputs
      if (
        inputs.userId === "" ||
        inputs.password === "" ||
        inputs.name === ""
      ) {
        return false;
      }
    } else {
      //validate userId and password
      if (inputs.userId === "" || inputs.password === "") {
        return false;
      }
    }
    return true;
  };

  const handleToggleSignUp = () => {
    setIsSignUp(prev => !prev);
    setInputs(INIT_INPUTS);
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      if (isSignUp) {
        createMeal({
          variables: {
            createMealInput: {
              loginId: inputs.userId,
              loginPassword: inputs.password,
              name: inputs.name,
              mealType: inputs.mealType,
              email: inputs.email,
              wantToReserve: true
            }
          }
        });
        return;
      }
      onLogin();
    } else {
      setOpenInputWarn(true);
    }
  };

  return (
    <Container width={"100vw"} height={"100vh"} direction={"column"}>
      <Title>
        <Typography>{isSignUp ? "Sign Up" : "Login"}</Typography>
      </Title>
      <LoginBox>
        <InputContainer>
          <Container alignItems={"center"}>
            <Typography fontSize={20}>{"User ID *"}</Typography>
            <Typography fontSize={12} paddingLeft={8}>
              {"(식수예약 서비스 계정)"}
            </Typography>
          </Container>
          <TextField
            height={32}
            required
            value={inputs.userId}
            placeholder={"1234"}
            onChange={e => {
              const _filtered = filterString(e.target.value);
              setInputs(prev => ({ ...prev, userId: _filtered }));
            }}
          />
        </InputContainer>
        <InputContainer>
          <Container alignItems={"center"}>
            <Typography fontSize={20}>password *</Typography>
            <Typography fontSize={12} paddingLeft={8}>
              {"(식수예약 서비스 계정, 암호 오류시 예약 실패)"}
            </Typography>
          </Container>
          <TextField
            height={32}
            required
            value={inputs.password}
            onChange={e => {
              const _filtered = filterString(e.target.value);
              setInputs(prev => ({ ...prev, password: _filtered }));
            }}
          />
        </InputContainer>
        {isSignUp && (
          <>
            <InputContainer>
              <Typography fontSize={20}>name *</Typography>
              <TextField
                height={32}
                value={inputs.name}
                onChange={e => {
                  const _filtered = filterString(e.target.value);
                  setInputs(prev => ({ ...prev, name: _filtered }));
                }}
              />
            </InputContainer>
            <InputContainer>
              <Container alignItems={"center"}>
                <Typography fontSize={20}>{"Meal Type "}</Typography>
                <Typography fontSize={12} paddingLeft={8}>
                  {" (예약 하고자 하는 식수 선택)"}
                </Typography>
              </Container>
              <Container justifyContent="space-around">
                <Container
                  onClick={() => {
                    setInputs(prev => ({ ...prev, mealType: "A" }));
                  }}
                >
                  <input
                    name="mealType"
                    type="radio"
                    checked={inputs.mealType === "A"}
                    onChange={() => {}}
                  />
                  <Typography>A</Typography>
                </Container>
                <Container
                  onClick={() => {
                    setInputs(prev => ({ ...prev, mealType: "B" }));
                  }}
                >
                  <input
                    name="mealType"
                    type="radio"
                    checked={inputs.mealType === "B"}
                    onChange={() => {}}
                  />
                  <Typography>B</Typography>
                </Container>
                <Container
                  onClick={() => {
                    setInputs(prev => ({ ...prev, mealType: "C" }));
                  }}
                >
                  <input
                    name="mealType"
                    type="radio"
                    checked={inputs.mealType === "C"}
                    onChange={() => {}}
                  />
                  <Typography>C</Typography>
                </Container>
              </Container>
            </InputContainer>
            <InputContainer>
              <Typography fontSize={20}>email</Typography>
              <TextField
                height={32}
                value={inputs.email}
                onChange={e => {
                  // const _filtered = filterString(e.target.value);
                  setInputs(prev => ({ ...prev, email: e.target.value }));
                }}
              />
            </InputContainer>
          </>
        )}
      </LoginBox>
      <ButtonBox>
        <Button onClick={handleSubmit}>{"GO!"}</Button>
        <Button onClick={handleToggleSignUp}>
          {isSignUp ? "Log in" : "Sign up"}
        </Button>
      </ButtonBox>
      {openInputWarn && (
        <Dialog
          open={openInputWarn}
          onClose={() => setOpenInputWarn(false)}
          width={"80%"}
          height={"20%"}
        >
          <WarnDialogContainer>
            <Typography fontSize={20}>{"모든 항목을 입력해주세요."}</Typography>
            <Typography fontSize={12}>
              {`userId, password${
                isSignUp ? ", name" : ""
              } 항목은 필수값입니다.`}
            </Typography>
          </WarnDialogContainer>
        </Dialog>
      )}
      {dupKeyWarn && (
        <Dialog
          open={dupKeyWarn}
          onClose={() => setDupKeyWarn(false)}
          width={"80%"}
          height={"15%"}
        >
          <WarnDialogContainer>
            <Typography fontSize={20}>
              {"이미 등록된 계정이 있습니다."}
            </Typography>
          </WarnDialogContainer>
        </Dialog>
      )}
    </Container>
  );
};

export default Login;
