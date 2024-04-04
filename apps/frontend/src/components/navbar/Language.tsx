import MenuItem from "./MenuItem";
import { useTranslation } from "react-i18next";
import logo from "@/assets/images/logo.png";
import englishFlag from "@/assets/images/englishFlag.png";
import hebrewFlag from "@/assets/images/hebrewFlag.png";

import useLanguageModel from "../hooks/useLanguageModel";
import useMenuModel from "../hooks/useMenuModel";

type Language = "en" | "he";

const Language = () => {
  const languageModel = useLanguageModel();
  const userMenuModel = useMenuModel();

  const { i18n } = useTranslation();

  const handleChangeLanguage = (lng: Language): void => {
    switch (lng) {
      case "en":
        i18n.changeLanguage("en");
        break;
      case "he":
        i18n.changeLanguage("he");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          languageModel.onOpen();
          userMenuModel.onClose();
        }}
      >
        <img className=" w-5 h-5" src={logo} />
      </button>
      {languageModel.isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            top-12
            right-0
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem
                onClick={() => {
                  handleChangeLanguage("en");
                  languageModel.onClose();
                }}
                label="English"
                img={englishFlag}
              />
              <MenuItem
                onClick={() => {
                  handleChangeLanguage("he");
                  languageModel.onClose();
                }}
                img={hebrewFlag}
                label="עברית"
              />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default Language;
