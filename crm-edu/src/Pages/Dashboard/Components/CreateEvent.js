import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClockIcon } from "../../../Components/Icons";
import { addAppointment } from "../../../Utils/Api/Api";
import Loader from "../../../Components/Loader";
import Success from "../../../Components/Success";

export default function CreateEvent({ handleEventModal }) {
  // Datafields
  const Datafields = [
    {
      name: "Parent Name",
      type: "text",
      placeholder: "Enter Parent Name",
      fieldName: "parentName",
    },
    {
      name: "Student Name",
      type: "text",
      placeholder: "Enter Student Name",
      fieldName: "studentName",
    },
    {
      name: "Email",
      type: "email",
      placeholder: "Enter Email",
      fieldName: "email",
    },
    {
      name: "Phone",
      type: "number",
      placeholder: "Enter Phone Number",
      fieldName: "phone",
    },
    {
      name: "Query",
      type: "text",
      placeholder: "Enter Query",
      fieldName: "query",
    },
    {
      name: "Start Time",
      type: "datetime-local",
      fieldName: "startTime",
    },
    {
      name: "End Time",
      type: "datetime-local",
      fieldName: "endTime",
    },
  ];
  const [form, setForm] = useState({
    studentName: "",
    parentName: "",
    query: "",
    email: "",
    phone: "",
    startTime: "",
    endTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const closeModal = () => {
    handleEventModal();
  };

  const handleUpdate = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert date to ISO string
    const startTimeUTC = new Date(form.startTime).toISOString();
    const endTimeUTC = new Date(form.endTime).toISOString();

    setLoading(true);
    try {
      const formData = {
        ...form,
        startTime: startTimeUTC,
        endTime: endTimeUTC,
      };
      const response = await addAppointment(formData);
      setLoading(false);
      setSuccess(true);
      closeModal();
    } catch (error) {
      setError(error.message || "An error occurred");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 6000);
    }
  }, [error]);

  const handleTest = () => {
    const date = new Date(form.startTime);
    const date2 = new Date(form.endTime);

    console.log(date2.toISOString());
    console.log(form.startTime);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px] flex flex-col gap-3 justify-center items-center z-30"
    >
      <div className="flex flex-col gap-5 w-[25rem] max-h-[95vh]">
        <div className=" bg-white-og bg-opacity-80 rounded-xl flex flex-col overflow-hidden relative">
          <div className="p-4">
            <div className="flex items-center gap-2 border-b border-zinc-400">
              <ClockIcon className="w-6 h-6 " />
              <h1 className="text-2xl font-bold text-black-1 w-full ">
                Create Event
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 px-1 py-2">
                {Datafields.map((field, index) => (
                  <div key={index} className="flex flex-col gap-1 text-[14px]">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className=" font-semibold">{field.name}</h2>
                    </div>
                    <input
                      type={field.type}
                      name={field.fieldName}
                      value={form[field.fieldName]}
                      onChange={handleUpdate}
                      placeholder={field.placeholder || ""}
                      className="text-[15px] focus:outline-2 focus:outline-offset-1 focus:outline-blue-600 focus:bg-blue-50  border border-zinc-400 bg-zinc-100 rounded-md px-2 pt-1 pb-[3px]"
                    />
                  </div>
                ))}
              </div>
              {error && <p className="text-red-500 text-sm px-2">{error}</p>}
            </form>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              disabled={loading || success}
              className="w-full outline-none text-green-500 bg-green-100 bg-opacity-80 p-3 text-lg font-medium"
            >
              Create
            </button>
          </div>

          {loading && (
            <div className="fixed bg-black bg-opacity-50 z-40 w-full h-full top-0 left-0">
              <Loader />
            </div>
          )}
          {success && (
            <div className="fixed bg-black bg-opacity-50 z-40 w-full h-full top-0 left-0">
              <Success />
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl">
          <button
            className="p-3 w-full text-lg text-blue-600 font-medium outline-none"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>

      <div>
        <button
          onClick={handleTest}
          className="px-3 py-1 bg-black text-white rounded-md"
        >
          TEST
        </button>
      </div>
    </motion.div>
  );
}
