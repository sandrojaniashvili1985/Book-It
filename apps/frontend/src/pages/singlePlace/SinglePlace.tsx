import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "primereact/image";
import Heading from "@/components/ui/Heading";
import DatePicker from "./DatePicker";
import AddGusts from "./AddGusts";

import {
  FaDoorClosed,
  // FaPaw,
  FaParking,
  FaTv,
  // FaUtensils,
  FaWifi,
} from "react-icons/fa";
import Button from "@/components/ui/Button";

const SinglePlace = () => {
  const { id } = useParams();
  const [singlePlace, setSinglePlace] = useState({
    owner: "",
    _id: "",
    name: "",
    address: "",
    title: "",
    description: "",
    price: 0,
    rating: 0,
    photos: [],
  });
  useEffect(() => {
    const fetchSinglePlace = async () => {
      const { data } = await axios.get("/api/hotels/" + id);
      setSinglePlace(data);
    };
    fetchSinglePlace();
  }, [id]);

  return (
    <div className="m-10">
      <div className="flex justify-center items-center border-t-[1px] border-neutral-300 p-6 mt-6">
        <div className="" key={singlePlace._id}>
          <div className=" pb-6">
            <h1 className="text-4xl font-normal">{singlePlace.title}</h1>
          </div>
          <div className=" grid grid-cols-4 grid-rows-2 gap-4 rounded-xl overflow-hidden h-80">
            {singlePlace.photos.map((photo) => (
              <Image
                key={Date.now() + Math.random()}
                src={`http://localhost:5000/api/hotels/uploads/${photo}`}
                alt="photo"
                width="250"
                preview
                className={`transition-all duration-300 ease-in-out cursor-pointer
                  ${photo === singlePlace.photos[0] && "col-span-2 row-span-2"}
                `}
              />
            ))}
          </div>
          <div className=" relative top-8 flex">
            <div className="">
              <div className="py-4">
                <h4 className="text-2xl ">{singlePlace.address}</h4>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="">{singlePlace.description}</h1>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="text-xl font-semibold">{singlePlace.price}</h1>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="text-xl font-semibold">{singlePlace.rating}</h1>
              </div>
              <div className=" border-t-[1px] border-neutral-300 my-4">
                <Heading title="What this place offers" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <FaWifi size={24} />
                    <h1 className="text-2xl">Wifi</h1>
                  </div>
                  <div className="flex gap-2">
                    <FaTv size={24} />
                    <h1>Tv</h1>
                  </div>
                  <div className="flex gap-2">
                    <FaParking size={24} />
                    <h1>Free Parking</h1>
                  </div>
                  <div className="flex gap-2">
                    <FaDoorClosed size={24} />
                    <h1>Privet Entrance</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* date picker and pay */}
            <div className="  ml-10 relative min-w-max rounded-lg shadow-2xl px-2 flex flex-col gap-4">
              <h2 className=" font-bold text-xl mt-4">
                ₪45,303
                <span className="ml-2 text-base font-extralight">night</span>
              </h2>

              <div>
                <p className=" font-thin">Select Date Range</p>
                <DatePicker />
              </div>
              <AddGusts />
              <div className=" mb-6">
                <Button label="Reserve" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlace;
