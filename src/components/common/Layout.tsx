import styled from "@emotion/styled";
import MenuBox from "../MenuBox";
import Container from "./Container";

const MenuBoxContainer = styled(Container)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  height: 64,
  backgroundColor: theme.palette.main,
  borderRadius: "16px 16px 0 0"
}));

type Props = {
  children: React.ReactNode;
};
const Layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
      <MenuBoxContainer>
        <MenuBox />
      </MenuBoxContainer>
    </>
  );
};

export default Layout;
