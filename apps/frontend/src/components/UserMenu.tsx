import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";

import useRegisterModel from "../components/hooks/useRegisterModel";
import useLoginModel from "../components/hooks/useLoginModel";
import { useAuthStore } from "@/components/hooks/useAuthStore";
import { useEffect } from "react";
import BasicDemo from "./MenuButton";
import Language from "./Language";

function UserMenu() {
  const { t } = useTranslation();
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const navigate = useNavigate();

  const items = [
    {
      label: "",
      items: [
        {
          label: t("NAV-BAR.User-menu.Login.LoggedIn.my-trip"),
          icon: "",
          command: () => {
            console.log("My Trip clicked");
          },
        },
        {
          label: t("NAV-BAR.User-menu.Login.LoggedIn.my-favorites"),
          icon: "",
          command: () => {
            console.log("My Favorites clicked");
          },
        },
        {
          label: t("NAV-BAR.User-menu.Login.LoggedIn.my-reservations"),
          icon: "",
          command: () => {
            console.log("My Reservations clicked");
            navigate("/account/bookings");
          },
        },
        {
          label: t("NAV-BAR.User-menu.Login.LoggedIn.my-properties"),
          icon: "",
          command: () => {
            console.log("My Properties clicked");
            navigate("/account/profile");
          },
        },
        {
          label: t("NAV-BAR.User-menu.Login.LoggedIn.account"),
          icon: "",
          command: () => {
            navigate("/account");
          },
        },
      ],
    },
  ];

  const items2 = [
    {
      label: "",
      items: [
        {
          label: t("NAV-BAR.User-menu.Login.login"),
          icon: "",
          command: () => {
            navigate("/login");
            loginModel.onOpen();
          },
        },
        {
          label: t("NAV-BAR.User-menu.Sign-up.sign-up"),
          icon: "",
          command: () => {
            navigate("/register");
            registerModel.onOpen();
          },
        },
      ],
    },
  ];

  const { isLoggedIn, user } = useAuthStore();

  useEffect(() => {
    useAuthStore.getState().getUser();
  }, []);

  return (
    <div className=" relative flex gap-2">
      <Language />
      <div className="flex justify-center bg-neutral-100 p-2 rounded-full">
        {isLoggedIn ? (
          <>
            <FaUserCircle size={24} />
            <BasicDemo
              items={items}
              label={user?.username}
              icon={<FiAlignJustify color="black" />}
            />
          </>
        ) : (
          <BasicDemo
            items={items2}
            label={<FaUserCircle size={24} />}
            icon={<FiAlignJustify color="green" />}
          />
        )}
      </div>
    </div>
  );
}

export default UserMenu;
