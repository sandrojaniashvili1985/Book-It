import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-6 px-10">
      <header className="flex items-center justify-between">
        {/* here is book it and logo */}
        <div>
          <Link to={"/"} className=" flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#60A5FA"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
              />
            </svg>
            <span className=" font-bold text-2xl text-blue-400">Book It</span>
          </Link>
        </div>
        {/* search */}
        <div className=" flex gap-3 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div className=" border-r-[1px] px-2">
            {t("NAV-BAR.Search.anywhere")}
          </div>
          <div className=" border-r-[1px] px-2">
            {t("NAV-BAR.Search.any-week")}
          </div>
          <div>{t("NAV-BAR.Search.add-guests")}</div>
          <button className=" bg-primary text-black p-1 rounded-full">
            <BiSearch size={18} />
          </button>
        </div>
        {/* user menu */}
        <UserMenu />
      </header>
    </div>
  );
};

export default Header;
