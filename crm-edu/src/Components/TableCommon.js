import React from "react";
import Loader from "./Loader";

export default function TableCommon({
  headings,
  data,
  loading = false,
  error,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-left rounded-xl">
        <thead>
          <tr className="bg-gray-200">
            {headings.map((head, index) => (
              <th key={index} className="p-2  rounded-">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            !loading &&
            data.map((row) => (
              <tr className="hover:bg-gray-100 text-[15px] cursor-pointer">
                {headings.map((head, index) => (
                  <td key={index} className=" px-2 py-1">
                    {row[head.toLowerCase()]}
                  </td>
                ))}
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
    </div>
  );
}
