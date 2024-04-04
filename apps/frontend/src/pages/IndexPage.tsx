import Heading from "@/components/ui/Heading";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ItemWithoutThumbnailsDemo from "@/components/ItemThumbnailsDemo";

const IndexPage = () => {
  const [hotels, setHotels] = useState([]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="">
            <div className=" bg-cover bg-center bg-no-repeat rounded-xl mb-10">
              <Link to={"/" + hotel._id}>
                <ItemWithoutThumbnailsDemo id={hotel._id} />
              </Link>
              <h1 className=" rubik text-base font-semibold my-3">
                {hotel.address}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
