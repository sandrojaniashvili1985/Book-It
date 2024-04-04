import Heading from "../ui/Heading";
import {
  FaDoorClosed,
  FaPaw,
  FaParking,
  FaTv,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

const Perks = ({ register }) => {
  return (
    <>
      <Heading title="Perks" subtitle="select all the perks" />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" {...register("perks[breakFast]")} />
          <FaUtensils size={18} />
          Break fast
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" {...register("perks[wifi]")} />
          <FaWifi size={18} />
          Wi-Fi
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" {...register("perks[parking]")} />
          <FaParking size={18} />
          parking
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" {...register("perks[tv]")} />
          <FaTv size={18} />
          Tv
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" {...register("perks[pets]")} />
          <FaPaw size={18} />
          Pets
        </label>
        <label className=" border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <input type="checkbox" {...register("perks[privetEntrance]")} />
          <FaDoorClosed size={18} />
          Privet entrance
        </label>
      </div>
    </>
  );
};

export default Perks;
