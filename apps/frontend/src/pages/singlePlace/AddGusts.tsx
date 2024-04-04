import { Accordion, AccordionTab } from "primereact/accordion";
import { useState } from "react";

export default function AddGusts() {
  const [counts, setCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

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

  return (
    <div className="card">
      <Accordion activeIndex={0}>
        <AccordionTab header="Guests">
          <div className=" flex flex-col gap-6">
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
        </AccordionTab>
      </Accordion>
    </div>
  );
}
