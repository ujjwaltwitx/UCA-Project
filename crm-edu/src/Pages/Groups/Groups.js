import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TableCommon from "../../Components/TableCommon";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import GroupSingle from "./GroupSingle";
import axios from "axios";
import Loader from "../../Components/Loader";

const headings = ["Name", "No of Students", "No of Tutors"];
export default function Groups() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
  });
  const [loadingForm, setLoadingForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/group/view");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingForm(true);
    try {
      const sendingData = {
        name: form.name,
        noStudents: 0,
        tutors: [],
      };
      await axios.post("http://localhost:4000/group/add", sendingData);
      setForm({ name: "" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForm(false);
    }
  };

  console.log(data);

  useEffect(() => {
    fetchGroups();
  }, []);

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
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                      <tr
                        onClick={() =>
                          navigate(`/dashboard/groups/${row?._id}`)
                        }
                        className="hover:bg-gray-100 text-[15px] cursor-pointer"
                      >
                        <td className=" px-2 py-1">{row?.name}</td>
                        <td className=" px-2 py-1">{row?.noStudents}</td>
                        <td className=" px-2 py-1">{row?.tutors.length}</td>
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
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1">
        <Routes>
          <Route path="/:id" element={<GroupSingle />} />
        </Routes>
      </div>
    </motion.div>
  );
}
