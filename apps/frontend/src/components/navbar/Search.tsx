import { Menubar } from "primereact/menubar";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import useCountryStore from "@/components/hooks/useCountry";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [selectWhere, setSelectWhere] = useState(false); // Add this line
  const [countries, setCountries] = useState(""); // Add this line
  const [selectedCheckInDate, setSelectedCheckInDate] = useState<Date | null>(
    null
  );
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState<Date | null>(
    null
  );
  const [shouldShowGuests, setShouldShowGuests] = useState(false); // Add this line
  const [counts, setCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const navigate = useNavigate();

  const increment = (type) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  const decrement = (type) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] > 0 ? prevCounts[type] - 1 : 0,
    }));
  };
  const { setCountry } = useCountryStore();
  const items = [
    {
      label: `Where ${countries ? countries : ""}`,
      icon: "pi pi-fw pi-map-marker",
      command: () => setSelectWhere(!selectWhere),
      items: [
        {
          label: "Indonesia",
          icon: "pi pi-fw pi-map-marker",
          command: () => setCountries("Indonesia"),
        },
        {
          label: "Greece",
          icon: "pi pi-fw pi-map-marker",
          command: () => setCountries("Greece"),
        },
        {
          label: "United States",
          icon: "pi pi-fw pi-map-marker",
          command: () => setCountries("United States"),
        },
        {
          label: "Spain",
          icon: "pi pi-fw pi-map-marker",
          command: () => setCountries("Spain"),
        },
        {
          label: "Israel",
          icon: "pi pi-fw pi-map-marker",
          command: () => setCountries("Israel"),
        },
      ],
    },
    {
      label: `Check-in ${
        selectedCheckInDate ? selectedCheckInDate.toDateString() : ""
      }`,
      icon: "pi pi-calendar",
      command: () => setShowCheckInCalendar(true),
    },
    {
      label: `Check-out ${
        selectedCheckOutDate ? selectedCheckOutDate.toDateString() : ""
      }`,

      icon: "pi pi-calendar",
      command: () => setShowCheckOutCalendar(true),
    },
    {
      label: `Who ${counts.adults + counts.children + counts.infants} Guests`,

      icon: "pi pi-users",
      command: () => setShouldShowGuests(!shouldShowGuests), // Add this line
    },
    {
      label: "Search",
      icon: "pi pi-search",
      command: () => {
        setCountry(countries);
        if (countries == "") {
          return alert("Please select a country");
        }
        navigate("/search");
      },
    },
  ];

  const handleCloseCheckInCalendar = () => {
    setShowCheckInCalendar(false);
  };

  const handleCloseCheckOutCalendar = () => {
    setShowCheckOutCalendar(false);
  };

  const handleCheckInDateSelect = (e: { value: Date | null }) => {
    setSelectedCheckInDate(e.value);
    setShowCheckInCalendar(false); // Close the Check-in calendar after selecting a date
  };

  const handleCheckOutDateSelect = (e: { value: Date | null }) => {
    setSelectedCheckOutDate(e.value);
    setShowCheckOutCalendar(false); // Close the Check-out calendar after selecting a date
  };

  return (
    <div>
      <Menubar model={items} />
      {showCheckInCalendar && (
        <div className="calendar-overlay" onClick={handleCloseCheckInCalendar}>
          <div
            className="calendar-container absolute z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar
              value={selectedCheckInDate}
              onChange={handleCheckInDateSelect}
              inline
            />
          </div>
        </div>
      )}
      {showCheckOutCalendar && (
        <div className="calendar-overlay" onClick={handleCloseCheckOutCalendar}>
          <div
            className="calendar-container absolute z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar
              value={selectedCheckOutDate}
              onChange={handleCheckOutDateSelect}
              inline
            />
          </div>
        </div>
      )}
      {/* Your "Guests" menu items here */}
      {shouldShowGuests && (
        <div className=" flex flex-col gap-6 absolute z-20 bg-white p-4 right-1/4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className=" font-semibold">Adults</h1>
              <p className=" font-mono">Age 13+</p>
            </div>
            <div className="flex gap-2 justify-between w-28 items-center">
              <button
                className="border-neutral-600 border-[1px] rounded-full w-8 h-8 flex justify-center items-center"
                onClick={() => decrement("adults")}
              >
                -
              </button>
              <h1>{counts.adults}</h1>
              <button
                onClick={() => increment("adults")}
                className="border-neutral-600 border-[1px] rounded-full w-8 h-8 flex justify-center items-center"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className=" font-semibold">Children</h1>
              <p className=" font-mono">Ages 2-12</p>
            </div>
            <div className="flex gap-2 justify-between w-28 items-center">
              <button
                onClick={() => decrement("children")}
                className="border-neutral-600 border-[1px] rounded-full w-8 h-8 flex justify-center items-center"
              >
                -
              </button>
              <h1>{counts.children}</h1>
              <button
                onClick={() => increment("children")}
                className="border-neutral-600 border-[1px] rounded-full w-8 h-8 flex justify-center items-center"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className=" font-semibold">Infants</h1>
              <p className=" font-mono">Under 2</p>
            </div>
            <div className="flex gap-2 justify-between w-28 items-center">
              <button
                onClick={() => decrement("infants")}
                className="border-neutral-600 border-[1px] rounded-full w-8 h-8 flex justify-center items-center"
              >
                -
              </button>
              <h1>{counts.infants}</h1>
              <button
                onClick={() => increment("infants")}
                className="border-neutral-600 border-[1px] rounded-full w-8 h-8 flex justify-center items-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
