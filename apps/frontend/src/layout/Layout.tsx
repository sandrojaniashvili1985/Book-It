import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import ToasterProvider from "../providers/ToasterProvider";

const Layout = () => {
  return (
    <div>
      {/* this toaster gives me message when request successes or not */}
      <ToasterProvider />
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
