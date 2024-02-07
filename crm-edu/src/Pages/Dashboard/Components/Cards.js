import React, { useState } from "react";
import {
  BankIcon,
  CalIcon,
  CashIcon,
  GroupUserIcon,
} from "../../../Components/Icons";
import { AnimatePresence, motion } from "framer-motion";

export default function Cards({ data }) {
  const [isChange, setIsChange] = useState(true);

  const {
    active,
    inactive,
    pending,
    offlinePayment,
    onlinePayment,
    dayWiseCount,
  } = data;

  function todayStudent() {
    const date = new Date();
    const daysArr = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const today = daysArr[date.getDay() - 1];
    if (dayWiseCount && dayWiseCount.length > 0) {
      const count = dayWiseCount.find((item) => item._id === today);
      if (count) {
        return count.count;
      }
    }

    // Return 0 if no count is found
    return 0;
  }

  return (
    <div className="flex xl:grid xl:grid-cols-2 xl:grid-flow-row gap-5">
      <div className="p-8 w-[11rem] h-[10rem] rounded-3xl shadow-md flex justify-center items-center bg-white-og text-charcoal">
        <div className="flex flex-col items-center text-center gap-3">
          <div>
            <div
              className={`w-12 h-12 rounded-2xl flex justify-center items-center bg-[#daeafe]`}
            >
              <GroupUserIcon className="w-7 h-7" fill="#0873F7" />
            </div>
          </div>
          <div className="text-3xl font-bold">{active ? active : "--"}</div>
          <div className=" font-medium text-zinc-500 ">Total Active</div>
        </div>
      </div>

      <div className="p-8 w-[11rem] h-[10rem] rounded-3xl shadow-md flex justify-center items-center bg-white-og text-charcoal">
        <div className="flex flex-col items-center text-center gap-3">
          <div>
            <div
              className={`w-12 h-12 rounded-2xl flex justify-center items-center bg-[#fcfeda]`}
            >
              <CalIcon className="w-7 h-7" fill="#ffd300" />
            </div>
          </div>
          <div className="text-3xl font-bold">{todayStudent()}</div>
          <div className=" font-medium text-zinc-500 ">Today</div>
        </div>
      </div>

      <button
        className=" col-span-2 w-[23.6rem] min-h-[10.5rem] max-h-[11.5rem] outline-none relative overflow-y-hidden rounded-3xl pb-2"
        onClick={() => setIsChange(!isChange)}
      >
        <AnimatePresence>
          {isChange && (
            <motion.div
              initial={{ y: "100px", opacity: 0, zIndex: -1 }}
              animate={{ y: 0, opacity: 1, zIndex: 1 }}
              exit={{ y: "-100px", opacity: 0, zIndex: -1 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="p-5 top-0 left-0 absolute w-[23.5rem] min-h-[10rem] max-h-[11.5rem] col-span-2 rounded-3xl shadow-md flex flex-col justify-center items-center bg-white-og text-charcoal"
            >
              <div className="flex flex-col gap-4 w-full">
                {/* //! Section-1 */}
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex justify-center items-center bg-[#dafeee]`}
                    >
                      <CashIcon className="w-7 h-7" fill="#00e038" />
                    </div>

                    <div>
                      <div className="text-zinc-500 text-lg font-medium">
                        Cash
                      </div>
                    </div>
                  </div>

                  {/* //*  number */}
                  <div>
                    <div className="text-3xl font-bold">{offlinePayment}</div>
                  </div>
                </div>

                <div className="border-b"></div>

                {/* //! Section-2 */}
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex justify-center items-center bg-[#fcdde4]`}
                    >
                      <BankIcon className="w-6 h-6" fill="#eb1f48" />
                    </div>

                    <div>
                      <div className="text-zinc-500 text-lg font-medium">
                        Online
                      </div>
                    </div>
                  </div>

                  {/* //*  number */}
                  <div>
                    <div className="text-3xl font-bold">{onlinePayment}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isChange && (
            <motion.div
              initial={{ y: "100px", opacity: 0, zIndex: -1 }}
              animate={{ y: 0, opacity: 1, zIndex: 1 }}
              exit={{ y: "-100px", opacity: 0, zIndex: -1 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="p-5 top-0 left-0 absolute w-[23.5rem] min-h-[10rem] max-h-[11.5rem] col-span-2 rounded-3xl shadow-md flex flex-col justify-center items-center bg-white-og text-charcoal"
            >
              <div className="flex flex-col gap-4 w-full">
                {/* //! Section-1 */}
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full flex justify-center items-center bg-yellow-500`}
                    >
                      {/* <CashIcon className="w-7 h-7" fill="#00e038" /> */}
                    </div>

                    <div>
                      <div className="text-zinc-500 text-lg font-medium">
                        Pending
                      </div>
                    </div>
                  </div>

                  {/* //*  number */}
                  <div>
                    <div className="text-3xl text-yellow-500 font-bold">
                      {pending >= 0 ? pending : "--"}
                    </div>
                  </div>
                </div>

                <div className="border-b"></div>

                {/* //! Section-2 */}
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full flex justify-center items-center bg-red-500`}
                    >
                      {/* <BankIcon className="w-6 h-6" fill="#eb1f48" /> */}
                    </div>

                    <div>
                      <div className="text-zinc-500 text-lg font-medium">
                        Inactive
                      </div>
                    </div>
                  </div>

                  {/* //*  number */}
                  <div>
                    <div className="text-3xl text-red-500 font-bold">
                      {inactive >= 0 ? inactive : "--"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
