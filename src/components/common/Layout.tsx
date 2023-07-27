type Props = {
  children: React.ReactNode;
};
const Layout = (props: Props) => {
  const { children } = props;
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
