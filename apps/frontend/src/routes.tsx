import LoginModel from "./components/modal/LoginModel";
import RegisterModel from "./components/modal/RegisterModel";
import Layout from "./layout/Layout";
import IndexPage from "./pages/IndexPage";
import AccountPage from "./pages/AccountPage";
import SinglePlace from "./pages/singlePlace/SinglePlace";

export const route = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/login",
        element: <LoginModel />,
      },
      {
        path: "/register",
        element: <RegisterModel />,
      },
      {
        path: "/account/:subpage?",
        element: <AccountPage />,
      },
      {
        path: "/account/:subpage/:action",
        element: <AccountPage />,
      },
      {
        path: "/:id",
        element: <SinglePlace />,
      },
    ],
  },
];
