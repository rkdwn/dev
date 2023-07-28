import { SettingIcon } from "@/components/Icons";
import {
  Button,
  ButtonGroup,
  Container,
  Icon,
  Typography
} from "@/components/common";
import { UserInfo } from "@/utils/DB";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Title = styled(Container)(({ theme }) => ({
  padding: 8,
  alignItems: "center"
}));

type Props = {
  userInfo: UserInfo | null;
  handleChangeSetting: (course: ScalarMealType, wantReserve: boolean) => void;
};

const ChangeSetting = (props: Props) => {
  const { userInfo, handleChangeSetting } = props;

  const [course, setCourse] = useState<ScalarMealType>("A");
  const [wantToReserve, setWantToReserve] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      setCourse(userInfo.mealType);
      setWantToReserve(userInfo.wantToReserve);
    }
  }, [userInfo]);

  const getCourseSelectedIndex = (course: ScalarMealType): number => {
    if (course === "A") return 0;
    if (course === "B") return 1;
    return 2;
  };

  const handleClickSave = async () => {
    if (!userInfo) return;
    handleChangeSetting(course, wantToReserve);
  };

  return (
    <Container direction={"column"} padding={8}>
      <Title>
        <Icon>
          <SettingIcon />
        </Icon>
        <Typography fontSize={24} bold>
          {"예약 설정 변경"}
        </Typography>
      </Title>
      <Container padding={8} direction={"column"}>
        <Typography fontSize={12} color={"disabled"}>
          {"다음 예약에 반영될 설정을 진행합니다."}
        </Typography>
        <Typography fontSize={12} color={"disabled"}>
          {"변경 후 Save 버튼을 누르지 않으면 저장되지 않습니다!"}
        </Typography>
      </Container>
      <Container
        padding={8}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={14}>{"예약 코스"}</Typography>
        <ButtonGroup
          width={140}
          divider
          list={[{ label: "A" }, { label: "B" }, { label: "C" }]}
          selectedIndex={getCourseSelectedIndex(course)}
          onChange={index => {
            if (index === 0) {
              setCourse("A");
              return;
            }
            if (index === 1) {
              setCourse("B");
              return;
            }
            setCourse("C");
          }}
        />
      </Container>
      <Container
        padding={8}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={14}>{"예약 설정"}</Typography>
        <ButtonGroup
          width={140}
          divider={true}
          list={[{ label: "O" }, { label: "X" }]}
          selectedIndex={wantToReserve ? 0 : 1}
          onChange={index => {
            if (index === 0) {
              setWantToReserve(true);
              return;
            }
            setWantToReserve(false);
          }}
        />
      </Container>
      <Container padding={8}>
        <Button width={"100%"} onClick={handleClickSave}>
          <Typography fontSize={14} color={"white"}>
            {"Save"}
          </Typography>
        </Button>
      </Container>
    </Container>
  );
};
export default ChangeSetting;
