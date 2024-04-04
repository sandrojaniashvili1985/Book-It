import { useTranslation } from "react-i18next";
import useLanguageModel from "./hooks/useLanguageMenu";
import MenuButton from "./MenuButton";
import { GrLanguage } from "react-icons/gr";

type Language = "en" | "he";

const Language = () => {
  const languageModel = useLanguageModel();
  const { i18n } = useTranslation();

  // A function that changes the language
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

  const items = [
    {
      label: "",
      items: [
        {
          label: "English",
          icon: "",
          command: () => {
            handleChangeLanguage("en");
            languageModel.onClose();
          },
        },
        {
          label: "עברית",
          icon: "",
          command: () => {
            handleChangeLanguage("he");
            languageModel.onClose();
          },
        },
      ],
    },
  ];

  return (
    <div className="flex items-center">
      <MenuButton icon={<GrLanguage color="black" />} items={items} />
    </div>
  );
};

export default Language;
