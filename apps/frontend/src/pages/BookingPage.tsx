import { useEffect, useState } from "react";
import ItemWithoutThumbnailsDemo from "@/components/ItemThumbnailsDemo";

import axios from "axios";

const BookingPage = () => {
  const [booking, setBooking] = useState(null);
  const [singlePlace, setSinglePlace] = useState(null);

  async function fetchBooking() {
    try {
      const response = await axios.get("/api/booking");
      const { data } = await axios.get(
        "/api/hotels/" + response?.data[0]?.hotel
      );
      setBooking(response.data);
      if (data) {
        setSinglePlace(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className=" flex gap-2 flex-1">
      <div className=" m-4 max-w-sm">
        <h1 className="rubik text-3xl font-semibold my-4">
          {singlePlace?.name}
        </h1>
        {singlePlace?._id && (
          <ItemWithoutThumbnailsDemo id={singlePlace?._id} />
        )}
      </div>
      {booking ? (
        <div className="">
          <h1 className="rubik text-3xl font-semibold my-4">Booking Details</h1>
          <div className="m-4">
            <h1 className="text-xl font-semibold">Check In:</h1>
            <p>{booking[0]?.checkIn}</p>
          </div>
          <div className="m-4">
            <h1 className="text-xl font-semibold">Check Out:</h1>
            <p>{booking[0]?.checkOut}</p>
          </div>
          <div className="m-4">
            <h1 className="text-xl font-semibold">
              Days of Stay: {booking[0]?.daysOfStay}
            </h1>
          </div>
          <div className="m-4">
            <h1 className="text-xl font-semibold">Amount:</h1>
            <p>{booking[0]?.amount}</p>
          </div>
        </div>
      ) : (
        <div> No booking found</div>
      )}
    </div>
  );
};

export default BookingPage;
