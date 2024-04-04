import { AiOutlineMenu } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import Language from "./Language";

import useRegisterModel from "../hooks/useRegisterModel";
import useLoginModel from "../hooks/useLoginModel";
import useMenuModel from "../hooks/useMenuModel";
import useLanguageModel from "../hooks/useLanguageModel";
import { useAuth } from "@/context/AuthContext";

function UserMenu() {
  const { t } = useTranslation();
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const languageModel = useLanguageModel();
  const userMenuModel = useMenuModel();

  const { isLoggedIn, logout } = useAuth();

  const toggleOpen = () => {
    userMenuModel.onOpen();
    languageModel.onClose();
  };

  return (
    <div className=" relative ">
      <div className=" flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
          hidden
          md:block
          text-sm
          font-semibold
          py-3
          px-4
          rounded-full
          hover:bg-neutral-100
          cursor-pointer
        
        "
        ></div>
        <div className=" min-w-max px-4">
          <Language />
        </div>
        <div
          onClick={toggleOpen}
          className="
          px-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          hover:shadow-md
          cursor-pointer
          transition"
        >
          <AiOutlineMenu />
          <div className=" hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {userMenuModel.isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            min-w-max
            md:w-3/4
            bg-white
            overflow-hidden
            top-12
            right-0
            text-sm            
          "
        >
          <div className="flex flex-col cursor-pointer">
            {isLoggedIn ? (
              <>
                <MenuItem
                  onClick={() => {
                    userMenuModel.onClose();
                  }}
                  label={t("NAV-BAR.User-menu.Login.LoggedIn.my-trip")}
                />
                <MenuItem
                  onClick={() => {
                    userMenuModel.onClose();
                  }}
                  label={t("NAV-BAR.User-menu.Login.LoggedIn.my-favorites")}
                />
                <MenuItem
                  onClick={() => {
                    userMenuModel.onClose();
                  }}
                  label={t("NAV-BAR.User-menu.Login.LoggedIn.my-reservations")}
                />
                <MenuItem
                  onClick={() => {
                    userMenuModel.onClose();
                  }}
                  label={t("NAV-BAR.User-menu.Login.LoggedIn.my-properties")}
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    logout();
                    userMenuModel.onClose();
                  }}
                  label={t("NAV-BAR.User-menu.Login.LoggedIn.logout")}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModel.onOpen();
                    userMenuModel.onClose();
                  }}
                  label={t("NAV-BAR.User-menu.Login.login")}
                />
                <MenuItem
                  onClick={() => {
                    registerModel.onOpen();
                    userMenuModel.onClose();
                  }}
                  label={t("NAV-BAR.User-menu.Sign-up.sign-up")}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
