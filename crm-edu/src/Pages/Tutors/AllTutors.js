import React, { useState } from "react";
import { motion } from "framer-motion";
import useTutors from "../../Utils/hooks/useTutors";
import Loader from "../../Components/Loader";

const headings = ["Name", "Joining Date", "Email"];
export default function AllTutors() {
  const [error, setError] = useState(null);

  const { tutors: data, isLoading: loading } = useTutors();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-5 w-full h-full relative"
    >
      <div className="flex flex-col gap-3">
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-left rounded-xl">
            <thead>
              <tr className="bg-gray-200">
                {headings?.map((head, index) => (
                  <th key={index} className="p-2  rounded-">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                !loading &&
                data?.map((row) => {
                  return (
                    <tr className="hover:bg-gray-100 text-[15px] cursor-pointer">
                      <td className=" px-2 py-1">{row?.name}</td>
                      <td className=" px-2 py-1">
                        {row?.joiningDate &&
                          new Date(row?.joiningDate).toISOString()}
                      </td>
                      <td className=" px-2 py-1">{row?.contactId?.email}</td>
                    </tr>
                  );
                })}
              {
                // ! This is the loading state
                loading && (
                  <tr>
                    <td colSpan={6} className="text-center p-2">
                      <Loader />
                    </td>
                  </tr>
                )
              }
              {
                // ! This is the no data state
                !loading && data && data?.tutor?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-2">
                      No Data Found
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
