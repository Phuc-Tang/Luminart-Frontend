import { Header } from "../components";

function MainLayout({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default MainLayout;
