import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Table from "../../Components/Table";
import { getStudents } from "../../Utils/Api/Api";
import { ReloadIcon } from "../../Components/Icons";

export default function Students() {
  const headings = ["Name", "Email", "Phone", "Subject", "Status", "Action"];
  const [modal, setModal] = useState(false); //? To show the modal of comment
  const [reload, setReload] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState("All");

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      let filters = {};
      if (selectedFilters === "All") filters = { approved: true };
      else if (selectedFilters === "Active") filters = { status: "Active" };
      else if (selectedFilters === "Inactive") filters = { status: "Inactive" };

      const data = await getStudents(filters, pageNo);
      setData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setError(null);
      setLoading(true);
      setData([]);
    };
  }, [reload, selectedFilters, pageNo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-5 w-full h-full relative"
    >
      <div className="overflow- flex flex-col gap-3">
        {/* Filter */}
        <div className="flex justify-between">
          <h3 className="text-xl ">{selectedFilters} Students</h3>
          <div className="flex gap-2 items-center ">
            <button onClick={fetchData} className="mt-1">
              <ReloadIcon />
            </button>
            <select
              name=""
              id=""
              value={selectedFilters}
              onChange={(e) => setSelectedFilters(e.target.value)}
              className="border border-zinc-400 rounded-md bg-white outline-none"
            >
              <option value="">All</option>
              <option value="">Today</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}

        <div className="min-h-[41.5rem]">
          <Table
            headings={headings}
            data={data}
            loading={loading}
            error={error}
            fetchData={fetchData}
            modal={modal}
            setModal={setModal}
            setReload={setReload}
          />
        </div>
        <div className="flex gap-2 justify-between items-center">
          <div>
            <button
              onClick={handlePrev}
              disabled={pageNo === 0}
              className="px-2 py-1 text-sm text-black-1 rounded-md bg-black bg-opacity-10 disabled:opacity-50"
            >
              Prev
            </button>
          </div>

          <div>
            <button
              onClick={handleNext}
              disabled={data.length < 10}
              className="px-2 py-1 text-sm text-black-1 rounded-md bg-black bg-opacity-10 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
