import { Link, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import PlacesForm from "@/components/places/placesForm";
import axios from "axios";
import Heading from "@/components/ui/Heading";
import ItemWithoutThumbnailsDemo from "@/components/ItemThumbnailsDemo";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const allPlacesData = async () => {
      // this will be replaced with the actual API endpoint
      const { data } = await axios.get("/api/hotels/owner/" + user.id);
      setPlaces(data);
    };
    allPlacesData();
  }, []);

  if (action === "new") {
    return <PlacesForm />;
  }

  return (
    <div>
      {/* <button onClick={allPlacesData}>data</button> */}
      <div className=" text-center">
        <Link
          to={"/account/places/new"}
          className=" inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full items-center hover:bg-blue-500 transition-all duration-300 ease-in-out"
        >
          <AiOutlinePlus size={16} />
          Add new place
        </Link>
      </div>
      <div className="px-10 py-4">
        <Heading title="Place owner" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {places.map((hotel) => (
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
    </div>
  );
};

export default PlacesPage;
