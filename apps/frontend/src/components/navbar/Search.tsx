
import { BiSearch } from "react-icons/bi";
import { useTranslation } from "react-i18next";

function Search() {
  const { t } = useTranslation()
  
  return (
    <div
      className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer"
    >
      <div
        className="
          flex
          flex-row
          justify-between
          items-center
        "
      >
        <div
          className="
            text-sm
            font-semibold
            px-6
          "
        >
          {t('NAV-BAR.Search.anywhere')}
        </div>
        <div
          className="
           hidden
           sm:block
           text-sm
            font-semibold
            px-6
            border-x-[1px]
            flex-1
            text-center
          "
        >
          {t('NAV-BAR.Search.any-week')}
          
        </div>
        <div
          className="
          text-sm
          pl-6
          pr-2
          text-gray-600
          flex
          flex-row
          items-center
          gap-3
        "
        >
          <div className=" hidden sm:block">
          {t('NAV-BAR.Search.add-guests')}
            
          </div>
          <div
            className="
            p-2
            bg-blue-500
            rounded-full
            text-white
          "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
