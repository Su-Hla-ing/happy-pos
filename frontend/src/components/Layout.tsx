import NavBar from "./NavBar";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}
const Layout = (prop: Props) => {
  return (
    <div>
      <NavBar />
      {prop.children}
    </div>
  );
};
export default Layout;
