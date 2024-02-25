import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Utils/constant";
import Loader from "../../Components/Loader";

const headings = ["Name", "Joining", "Salary"];

export default function GroupSingle() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGroup = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/group/view/${id}`);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGroup();
  }, [id]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">Group: {data?.name}</h1>
        <p>
          No of Students:{" "}
          <span className="font-semibold">{data?.noStudents}</span>
        </p>
      </div>

      <div className="">
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
                data?.tutors?.map((row) => {
                  return (
                    <tr className="hover:bg-gray-100 text-[15px] cursor-pointer">
                      <td className=" px-2 py-1">{row?.name}</td>
                      <td className=" px-2 py-1">
                        {row?.joiningDate &&
                          new Date(row?.joiningDate).toISOString()}
                      </td>
                      <td className=" px-2 py-1">{row?.salary}</td>
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
    </div>
  );
}
