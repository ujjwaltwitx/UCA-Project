import React from "react";
import Loader from "../../../Components/Loader";

export default function Table({
  headings,
  data,
  loading,
  handleSelectAll,
  selectAll,
  handleEmailSelection,
  selectedEmails,
  error,
}) {
  return (
    <table className="w-full text-left rounded-xl">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4">
            <div className="relative flex justify-center items-center">
              <input
                type="checkbox"
                name="selectAll"
                id="selectAll"
                className="z-10 cursor-pointer w-4 h-4"
                disabled={loading || data.length === 0}
                onChange={handleSelectAll}
                checked={selectAll}
              />
              {/* <div className="bg-blue-100 absolute w-6 h-6 p-4 z-0 rounded-full"></div> */}
            </div>
          </th>
          {headings.map((head, index) => (
            <th key={index} className="p-2">
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data &&
          !loading &&
          data.map((row) => (
            <tr key={row._id} className="">
              <td className="w-1 py-1 px-4">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  className="w-4 h-4 cursor-pointer"
                  value={row.email}
                  checked={!!selectedEmails[row.addressDetail.parentsEmail]}
                  onChange={(e) =>
                    handleEmailSelection(e, row.addressDetail.parentsEmail)
                  }
                />
              </td>
              <td className="px-2 py-1">{row.firstName}</td>
              <td className="px-2 py-1">
                {row.addressDetail.parentsEmail
                  ? row.addressDetail.parentsEmail
                  : "--"}
              </td>
              <td className="px-2 py-1">
                {row.status === "Active" && (
                  <span className="text-green-500 rounded-full">
                    {row.status}
                  </span>
                )}
                {row.status === "Inactive" && (
                  <span className="text-red-500 rounded-full">
                    {row.status}
                  </span>
                )}
                {row.status === "Pending" && (
                  <span className="text-yellow-500 rounded-full">
                    {row.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
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
          !loading && data && data.length === 0 && !error && (
            <tr>
              <td colSpan={6} className="text-center p-2">
                No Data Found
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
}
