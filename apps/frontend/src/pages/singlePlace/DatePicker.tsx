import { useState } from "react";
import { Calendar } from "primereact/calendar";

export default function DatePicker() {
  const [dates, setDates] = useState(null);

  return (
    <div className="card flex justify-content-center">
      <Calendar
        value={dates}
        onChange={(e) => setDates(e.value)}
        selectionMode="range"
        readOnlyInput
        placeholder="check in - check out"
      />
    </div>
  );
}
