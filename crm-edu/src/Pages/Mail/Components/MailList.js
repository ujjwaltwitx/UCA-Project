import React, { useEffect, useState } from "react";
import { getStudents } from "../../../Utils/Api/Api";
import Loader from "../../../Components/Loader";
import { ReloadIcon } from "../../../Components/Icons";
import Table from "./Table";

export default function MailList({ toMail, setToMail }) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState("All");
  const [pageNo, setPageNo] = useState(0);

  const [data, setData] = useState([]);

  //? handle email selection
  const handleEmailSelection = (e, email) => {
    const index = toMail.indexOf(email);
    if (index > -1) {
      const arr = [...toMail];
      arr.splice(index, 1);
      setToMail(arr);
    } else {
      setToMail([...toMail, email]);
    }

    setSelectedEmails((prev) => {
      // * creating a copy of the previous state
      const updatedSelection = { ...prev };

      // * if the email is already selected, then remove it from the list
      if (updatedSelection[email]) {
        delete updatedSelection[email];
      }
      // * else add it to the list
      else {
        updatedSelection[email] = true;
      }

      return updatedSelection;
    });
  };

  //? handle select all
  const handleSelectAll = (e) => {
    if (selectAll) {
      setSelectedEmails({});
      setToMail([]);
    } else {
      const allEmails = data.map((item) => item.addressDetail.parentsEmail);
      const selectedEmails = allEmails.reduce((acc, email) => {
        acc[email] = true;
        return acc;
      }, {});
      setSelectedEmails(selectedEmails);
      let arr = [];
      for (var key in selectedEmails) {
        arr.push(key);
      }
      setToMail(arr);
    }
    setSelectAll(!selectAll);
  };

  // handle page change
  const handlePrev = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  //? fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setData([]);

      let filters = {};
      if (selectedFilters === "All") filters = {};
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

  useEffect(() => {
    fetchData();
  }, [pageNo, selectedFilters]);

  const headings = ["Name", "Parent's Email", "Status"];

  if (loading) return <Loader />;

  if (data)
    return (
      <div className="flex flex-col gap-4">
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
        <div className="border overflow-x-auto rounded-xl min-h-[32rem]">
          <Table
            headings={headings}
            data={data}
            handleEmailSelection={handleEmailSelection}
            selectedEmails={selectedEmails}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            error={error}
          />
        </div>
      </div>
    );
}
