import React, { useState } from "react";
import { motion } from "framer-motion";
import TableCommon from "../../Components/TableCommon";
import { Route, Routes } from "react-router-dom";
import GroupSingle from "./GroupSingle";

const headings = ["Name", "No of Students"];
export default function Groups() {
  const [data, setData] = useState([]);
  const [loadingForm, setLoadingForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-screen-xxl border h-full flex gap-5 overflow-y-auto overflow-x-hidden"
    >
      {/* Left side */}
      <div className="flex-1 border flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold pb-1 border-b border-zinc-300">
            Create group
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-[14px]">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="name" className=" font-semibold">
                  Group Name
                </label>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                className="outline-none w-[28rem] bg-zinc-100 border border-zinc-400 rounded-md px-2 py-1"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loadingForm}
              className="max-w-md py-1 px-2 rounded-md text-white text-[15px] font-semibold bg-green-600 hover:bg-green-500 disabled:pointer-events-none"
            >
              <h1>{loadingForm ? "Creating" : "Create"}</h1>
            </button>
          </form>
        </div>

        <div className="border-t"></div>

        <div className="">
          <TableCommon headings={headings} data={data} error={null} />
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<GroupSingle />} />
        </Routes>
      </div>
    </motion.div>
  );
}
