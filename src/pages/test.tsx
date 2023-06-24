import { AddIcon, BackIcon, MenuIcon } from "@/components/Icons";
import { Container, Icon } from "@/components/common";

const Test = () => {
  //
  return (
    <Container direction="column">
      <Icon>
        <AddIcon />
      </Icon>
      <Icon>
        <BackIcon />
      </Icon>
      <Icon>
        <MenuIcon />
      </Icon>
    </Container>
  );
};
export default Test;
