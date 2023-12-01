import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import About from "./Components/About";
import Parents from "./Components/Parents";
import Medical from "./Components/Medical";
import Address from "./Components/Address";
import {
  AboutIcon,
  AddressIcon,
  AcademicIcon,
  MedicalIcon,
  ParentsIcon,
  UserIcon,
} from "../../Components/Icons";
import { useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../../Utils/Api/Api";
import Loader from "../../Components/Loader";
import Academic from "./Components/Academic";

export default function Student() {
  const [active, setActive] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  // ? Data segregration
  const [studentData, setStudentData] = useState({});
  const [status, setStatus] = useState("");

  const params = useParams();
  const links = [
    {
      id: 1,
      name: "About",
      component: "/",
      icon: <AboutIcon className="" />,
    },
    {
      id: 2,
      name: "Academic",
      component: "/academic",
      icon: <AcademicIcon className="w-5 h-5" />,
    },
    {
      id: 3,
      name: "Address",
      component: "/address",
      icon: <AddressIcon className="w-5 h-5" />,
    },
    {
      id: 4,
      name: "Parents",
      component: "/parents",
      icon: <ParentsIcon className="w-5 h-5" />,
    },

    {
      id: 5,
      name: "Medical",
      component: "/medical",
      icon: <MedicalIcon className="w-5 h-5" />,
    },
  ];

  // ? Handle Edit
  const handleStatusChange = async (e) => {
    const value = e.target.value;
    const sendingData = {
      status: value,
    };

    setLoading(true);
    setError("");
    try {
      const response = await updateStudent(params.id, sendingData);
      fetchData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
    setStatus(e.target.value);
  };

  const fetchData = (id) => {
    getStudentById(id)
      .then((data) => {
        setStudentData(data);
        setStatus(data.status);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(params.id);
  }, [params]);

  if (error) return <div>Something went wrong</div>;

  if (loading)
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="w-full h-full"
      >
        <Loader />
      </motion.div>
    );

  if (studentData)
    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="flex flex-col gap-5 h-full overflow-y-auto"
      >
        <div className="bg-sky-200 rounded-3xl flex flex-col gap-4 px-3 py-4">
          {/* Header */}
          <div className="w-full flex gap-4">
            <div>
              <UserIcon className="w-24 h-24" />
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <div className="flex justify-between gap-2">
                <div className="flex items-center gap-2 ">
                  <h3 className="text-2xl font-semibold text-black-1">
                    {studentData.firstName} {studentData.lastName}
                  </h3>
                  <div
                    className={`w-2 h-2 rounded-full
                    ${studentData.status === "Active" && "bg-green-500"}
                    ${studentData.status === "Inactive" && "bg-red-500"}
                    ${studentData.status === "Pending" && "bg-yellow-500"}
                  `}
                  ></div>
                </div>

                <div className="flex gap-2 items-center">
                  <select
                    name="status"
                    id=""
                    value={studentData.status}
                    onChange={handleStatusChange}
                    className="border-none outline-none rounded-md shadow-md bg-white-og p-1 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-12">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[14px] text-gray-700">Year</h3>
                  <p className="text-[16px] font-medium">
                    {studentData.schoolYear}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[14px] text-gray-700">Phone Number</h3>
                  <p className="text-[16px] font-medium">
                    +61 {studentData.parentDetail[0].phone}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[14px] text-gray-700">Email Address</h3>
                  <p className="text-[16px] font-medium">
                    {studentData.addressDetail.parentsEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          // ! This is the main content
        }
        <div className="w-full h-full flex flex-row gap-5">
          <div className="w-[12rem] pl-2">
            <div className=" flex flex-col gap-">
              {links.map((item) => {
                return (
                  <button
                    onClick={() => setActive(item.id)}
                    key={item.id}
                    className={`relative flex gap-5 items-center justify-between rounded-md outline-none px-2 text-[15px] 
                    ${
                      active === item.id
                        ? "bg-[#C4DFDF] bg-opacity-30  font-medium"
                        : "hover:bg-[#ECF9FF] "
                    }`}
                  >
                    <div className="flex py-[6px] gap-2 items-center text-black-1">
                      <div className="w-5 flex items-center justify-center rounded-full">
                        {item.icon}
                      </div>
                      <p>{item.name}</p>
                    </div>
                    {active === item.id && (
                      <div className="absolute top-0 -left-[7px] h-full w-1 py-[3px]">
                        <div className="bg-sky-500 rounded-2xl h-full w-full"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="py-2 text-[14px] text-gray-700 flex flex-col gap-2">
              <p>Some changes will be reflected after the reload.</p>
              <div>
                <button
                  onClick={fetchData(params.id)}
                  className="text-orange-600 px-2 py-[1px] bg-orange-100 rounded-md"
                >
                  Reload
                </button>
              </div>
            </div>
          </div>
          {/* Main */}
          <div className="w-full h-full scrollbar-hide">
            <div className="rounded-2xl flex flex-col gap-12">
              {active === 1 && <About data={studentData} />}
              {active === 2 && (
                <Academic
                  data={studentData.tutoringDetail}
                  id={studentData._id}
                />
              )}
              {active === 3 && (
                <Address
                  data={studentData.addressDetail}
                  id={studentData._id}
                />
              )}
              {active === 4 && (
                <Parents
                  data={studentData.parentDetail[0]}
                  id={studentData._id}
                />
              )}
              {active === 5 && (
                <Medical data={studentData.healthDetail} id={studentData._id} />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );

  return <p> No data available... </p>;
}
