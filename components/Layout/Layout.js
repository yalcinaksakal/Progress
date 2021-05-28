import NavList from "./Nav/NavList";

const Layout = props => {
  return (
    <>
      <NavList />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
