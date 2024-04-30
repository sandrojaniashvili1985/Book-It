import Heading from "@/components/ui/Heading";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemWithoutThumbnailsDemo from "@/components/ItemThumbnailsDemo";
import MapComponent from "@/components/MapComponent";

const IndexPage = () => {
  const [hotels, setHotels] = useState([]);
  const [map, setMap] = useState(false);

  useEffect(() => {
    const AllHotelsData = async () => {
      const { data } = await axios.get("/api/hotels/");
      setHotels(data);
    };
    AllHotelsData();
  }, []);

  return (
    <div className="px-10 py-4">
      <Heading title="All Hotels" subtitle="All hotels in one place" center />
      {map ? (
        <MapComponent hotels={hotels} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {hotels?.map((hotel) => (
            <div key={hotel._id} className="">
              <div className=" bg-cover bg-center bg-no-repeat rounded-xl mb-10">
                <Link to={"/" + hotel._id}>
                  <ItemWithoutThumbnailsDemo id={hotel._id} />
                </Link>
                <h1 className=" rubik text-base font-semibold my-2">
                  {hotel.address}
                </h1>
                <h1 className="">
                  <span className="text-sm font-bold mr-2">
                    Price: ₪{hotel.cheapestPrice}
                  </span>
                  <span className="ml-2">per night</span>
                </h1>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className=" bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed bottom-3 right-1/2 z-30 "
        onClick={() => setMap((prev) => !prev)}
      >
        {map ? "show hotels" : "Show Map"}
      </button>
    </div>
  );
};

export default IndexPage;
