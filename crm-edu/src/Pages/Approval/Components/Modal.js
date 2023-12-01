import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DeleteIcon } from "../../../Components/Icons";
import { getStudentById, updateStudent } from "../../../Utils/Api/Api";
import Loader from "../../../Components/Loader";

export default function Modal({ open, id, modal, handleModal }) {
  const sections = [
    {
      title: "Personal Details",
      fields: ["firstName", "lastName", "dob", "gender"],
      key: ["First Name", "Last Name", "DoB", "Gender"],
    },
    {
      title: "Address Details",
      fields: [
        "addressDetail.addressStreet",
        "addressDetail.suburb",
        "addressDetail.postCode",
      ],
      key: ["Address Street", "Suburb", "PostCode"],
    },
    {
      title: "Acadamic Details",
      fields: [
        "tutoringDetail.subjects",
        "tutoringDetail.frequency",
        "tutoringDetail.days",
        "tutoringDetail.paymentMethod",
      ],
      key: ["Subjects", "Frequency", "Preferred Days", "Payment Method"],
    },
    {
      title: "Health Details",
      fields: [
        "healthDetail.allergicFood",
        "healthDetail.medications",
        "healthDetail.allergicMedication",
        "healthDetail.healthProblem",
      ],
      key: [
        "Allergic Food",
        "Medications",
        "Allergic Medication",
        "Health Problem",
      ],
    },
  ];

  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

  const renderValue = (value) => {
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        return value.join(", ");
      } else {
        return Object.values(value).join(", ");
      }
    } else {
      return value;
    }
  };

  const handleTimeSlotChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };

  //? for the add button
  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { day: "", startAt: "", endAt: "" }]);
  };

  const handleRemoveSlot = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots.splice(index, 1);
    setTimeSlots(updatedTimeSlots);
  };

  const closeModal = () => {
    if (timeSlots.length <= 0) {
      handleModal(false);
      return;
    }

    if (window.confirm("Are you sure you want to close this modal?")) {
      handleModal(false);
      setData({});
    }
  };

  //? Chaning Approval Status
  const handleApprovalStatusChange = async () => {
    var daysList = []
    for(var i in timeSlots){
      daysList.push(timeSlots[i]["day"])
    }
    const newData = {
      approved: true,
      status: "Active",
      tutoringDetail: {
        subjects: data.tutoringDetail.subjects,
        frequency: data.tutoringDetail.frequency,
        paymentMethod: data.tutoringDetail.paymentMethod,
        days: daysList,
        timeSlots: timeSlots,
      },
    };

    try {
      console.log(id);
      const message = await updateStudent(id, newData);
      console.log(message);
      setStatus(true);
      handleModal();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setStatus(false);
    }
  };

  //?  Fetching current ID's Data
  const getData = async () => {
    if (id) {
      setLoading(true);
      try {
        const data = await getStudentById(id);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
    setError(null);
    setTimeSlots([]);
  }, [id]);

  if (open) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed  inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] flex flex-col gap-3 justify-center items-center z-30"
      >
        <div className="flex flex-col gap-5 w-[95vw] max-h-[95vh]">
          <div className=" bg-white-og bg-opacity-80 rounded-xl flex flex-col overflow-hidden">
            {loading ? (
              <div className="h-[95vh]">
                <Loader />
              </div>
            ) : (
              <div className="p-5 overflow-hidden">
                <div className="flex gap-10 justify-between items-center">
                  <h1 className="text-2xl font-bold">Approve Student</h1>
                  <button className="px-2 py-1 rounded-lg text-white bg-red-500 transition-all ease-in-out">
                    Delete
                  </button>
                </div>

                {/* //? Content */}
                <div className="w-full h-full flex gap-4">
                  <div className="flex-1 flex flex-col gap-5 py-3 h-full overflow-y-auto">
                    {sections.map((section, index) => (
                      <div key={index}>
                        <h2 className="text-lg text-blue-600">
                          {section.title}
                        </h2>

                        <div className="border-b border-gray-300 py-2">
                          {section.fields.map((field, fieldIndex) => {
                            const value = field
                              .split(".")
                              .reduce(
                                (obj, key) => (obj ? obj[key] : ""),
                                data
                              );

                            const key = section.key[fieldIndex];

                            return (
                              <div key={fieldIndex} className="flex gap-2">
                                <div className="flex-1 font-medium">
                                  {/* {field.split(".").pop()}:{" "} */}
                                  {key}
                                </div>
                                <div className="flex-1">
                                  {renderValue(value)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 flex flex-col gap-3">
                    <h2 className="text-lg text-blue-600">Time Slots</h2>
                    <div className="flex flex-col gap-3">
                      <div className="flex  gap-1">
                        <h3 className="flex-1 font-medium">Preferred Days</h3>
                        <div className="flex-1 flex flex-col gap-1">
                          {data &&
                            data.tutoringDetail?.days.map((day, index) => {
                              return (
                                <div key={index} className="flex">
                                  <div className="w-32 text-center p-2 text-sm rounded-md shadow-xl bg-blue-500 text-white-og ">
                                    {day}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center gap-1">
                          <h3 className="flex-1 font-medium">
                            Allot Time
                            <span className="text-sm text-gray-500">/Day</span>
                          </h3>
                          <div className="flex justify-between">
                            <button
                              onClick={handleAddTimeSlot}
                              className="px-4 py-1 text-sm rounded-md bg-sky-500 hover:shadow-xl"
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <table className="table-fixed text-center">
                            <thead>
                              <tr>
                                <th className="w-36">Day</th>
                                <th className="w-32">Start Time</th>
                                <th className="w-32">End Time</th>
                                <th className="w-32">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {timeSlots.map((timeSlot, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      <select
                                        name={`timeSlots[${index}].day`}
                                        value={timeSlot.day}
                                        onChange={(e) =>
                                          handleTimeSlotChange(
                                            index,
                                            "day",
                                            e.target.value
                                          )
                                        }
                                        className="w-36 rounded-md outline-none"
                                      >
                                        <option value=""> Select </option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">
                                          Wednesday
                                        </option>
                                        <option value="Thursday">
                                          Thursday
                                        </option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">
                                          Saturday
                                        </option>
                                        <option value="Sunday">Sunday</option>
                                      </select>
                                    </td>
                                    <td>
                                      <input
                                        type="time"
                                        placeholder="hrs:mins"
                                        name={`timeSlots[${index}].startAt`}
                                        value={timeSlot.startAt}
                                        onChange={(e) =>
                                          handleTimeSlotChange(
                                            index,
                                            "startAt",
                                            e.target.value
                                          )
                                        }
                                        className="px-1 w-32 flex-1 rounded-md outline-none"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="time"
                                        placeholder="hrs:mins"
                                        name={`timeSlots[${index}].endAt`}
                                        value={timeSlot.endAt}
                                        onChange={(e) =>
                                          handleTimeSlotChange(
                                            index,
                                            "endAt",
                                            e.target.value
                                          )
                                        }
                                        className="px-1 w-32 flex-1 rounded-md outline-none"
                                      />
                                    </td>
                                    <td>
                                      <button
                                        onClick={() => handleRemoveSlot(index)}
                                      >
                                        <DeleteIcon className="w-5 h-5" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="text-red-500 p-2 rounded-md flex gap-2">
                        <span className="font-medium">X</span>
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="border-b border-gray-300"></div>
            <div className="">
              <button
                onClick={() => handleApprovalStatusChange(true)}
                className="p-3 w-full hover:bg-white transition-all ease-in-out outline-none text-green-500 text-xl"
              >
                Approve
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl">
            <button
              className="p-3 w-full text-xl text-blue-600 font-medium outline-none"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
}
