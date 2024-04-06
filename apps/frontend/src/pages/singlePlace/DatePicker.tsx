import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { useDatePiker } from "@/components/hooks/useDatePiker";

export default function DatePicker() {
  const [dates, setDates] = useState(null);
  const { setDate, setCheckIn, setCheckOut } = useDatePiker();

  const formattedDates = dates?.map((date) => {
    const year = date?.getFullYear();
    const month = (date?.getMonth() + 1).toString().padStart(2, "0");
    const day = date?.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
  });

  function getDates() {
    if (!formattedDates || !formattedDates[1]) return;
    setCheckIn(dates[0]);
    setCheckOut(dates[1]);
    return formattedDates[1] - formattedDates[0];
  }

  useEffect(() => {
    const dateDiff = getDates();
    setDate(dateDiff);
  }, [dates]);

  return (
    <div className="card flex justify-content-center">
      <Calendar
        value={dates}
        onChange={(e) => setDates(e.value)}
        selectionMode="range"
        readOnlyInput
        placeholder="check in | check out"
        dateFormat="yy-mm-dd"
      />
    </div>
  );
}
