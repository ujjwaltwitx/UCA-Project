import React, { useState } from "react";
import { motion } from "framer-motion";
import { DeleteIcon } from "./Icons";
import Field from "../Pages/Dashboard/Components/Field";
import { sendFormByAdmin } from "../Utils/Api/Api";
import Loader from "./Loader";

export default function FormModal({ handleModal }) {
  const [form, setForm] = useState({
    // * Student
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",

    // * Address
    addressStreet: "",
    pinCode: "",
    email: "",
    phone: "",

    // * Parent
    name: "",
    relation: "",
    parentsEmail: "",

    // * Subjects
    subjects: "",
  });

  const resetForm = form;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const subjectList = ["Maths", "English", "Science", "Art"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendFormByAdmin(form);
      if (response.status === 200) {
        alert("Form submitted successfully");
        setForm(resetForm);
        handleModal(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      setForm(resetForm);
      handleModal(false);
    }
  };

  const handleChange = (e, field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: e.target.value,
    }));
  };

  console.log(form);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      className="fixed inset-0 top-0 left-0 bg-black bg-opacity-50 backdrop-blur-[2px] flex flex-col gap-3 justify-center items-center z-30"
    >
      <div className="flex flex-col gap-5 max-w-[95vw] max-h-[95vh] transition-all">
        {loading ? (
          <div className="bg-white-og bg-opacity-80 rounded-xl">
            <Loader />
          </div>
        ) : (
          <div className=" bg-white-og bg-opacity-80 rounded-xl flex flex-col overflow-hidden">
            <div className="p-5 overflow-hidden">
              <div className="flex justify-between items-center border-b border-gray-400">
                <h1 className="text-2xl font-bold">Enrolment Form</h1>
                <button className="p-2 rounded-full hover:bg-amber-200 outline-none transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 hover:text-amber-500 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => handleModal(false)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 grid-flow-row-dense gap-10 px-5  pb-4 overflow-y-auto">
              {/* Personal */}
              <div className="flex flex-col gap-3">
                <div className="pb-1 border-b border-zinc-400 flex gap-1 items-center ">
                  <h1 className="text-xl text-blue-600">Personal Profile</h1>
                </div>
                <div className="flex flex-col gap-3 ">
                  <Field
                    name="First Name"
                    type="text"
                    value={form.firstName}
                    onChange={(e) => handleChange(e, "firstName")}
                    loading={loading}
                  />
                  <Field
                    name="Last Name"
                    type="text"
                    value={form.lastName}
                    onChange={(e) => handleChange(e, "lastName")}
                    loading={loading}
                  />
                  <Field
                    name="Date of Birth"
                    type="date"
                    value={form.dob}
                    onChange={(e) => handleChange(e, "dob")}
                    loading={loading}
                  />
                  <Field
                    name="Gender"
                    type="select"
                    options={["Male", "Female", "Other"]}
                    value={form.gender}
                    onChange={(e) => handleChange(e, "gender")}
                    loading={loading}
                  />
                </div>
              </div>

              {/* Academic */}
              <div className="flex flex-col gap-3">
                <div className="pb-1 border-b border-zinc-400 flex gap-1 items-center ">
                  <h1 className="text-xl text-blue-600">Academic Profile</h1>
                </div>
                <div className="flex flex-col gap-3 ">
                  <div className="flex flex-col gap-1 text-[14px]">
                    <h2 className=" font-semibold">Subjects</h2>

                    <div className="flex flex-col gap-1 border border-zinc-400 bg-zinc-100 rounded-md min-w-[20rem] max-w-[22rem] p-3">
                      {subjectList.map((sub, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="radio"
                            disabled={loading}
                            id={sub}
                            name="subject"
                            value={form.subjects}
                            onChange={(e) => handleChange(e, "subjects")}
                          />
                          <label htmlFor={sub}>{sub}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-3">
                <div className="pb-1 border-b border-zinc-400 flex gap-1 items-center ">
                  <h1 className="text-xl text-blue-600">Contact Details</h1>
                </div>
                <div className="flex flex-col gap-3 ">
                  <Field
                    name="Address Street"
                    type="text"
                    value={form.addressStreet}
                    onChange={(e) => handleChange(e, "addressStreet")}
                    loading={loading}
                  />
                  <Field
                    name="Pin Code"
                    type="number"
                    value={form.pinCode}
                    onChange={(e) => handleChange(e, "pinCode")}
                    loading={loading}
                  />
                  <Field
                    name="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange(e, "email")}
                    loading={loading}
                  />
                  <Field
                    name="Phone Number"
                    type="number"
                    value={form.phone}
                    onChange={(e) => handleChange(e, "phone")}
                    loading={loading}
                  />
                </div>
              </div>

              {/* Parent */}
              <div className="flex flex-col gap-3">
                <div className="pb-1 border-b border-zinc-400 flex gap-1 items-center ">
                  <h1 className="text-xl text-blue-600">Parents Information</h1>
                </div>
                <div className="flex flex-col gap-3 ">
                  <Field
                    name="Name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange(e, "name")}
                    loading={loading}
                  />
                  <Field
                    name="Relation"
                    type="text"
                    value={form["relation"]}
                    onChange={(e) => handleChange(e, "relation")}
                    loading={loading}
                  />
                  <Field
                    name="Email"
                    type="email"
                    value={form.parentsEmail}
                    onChange={(e) => handleChange(e, "parentsEmail")}
                    loading={loading}
                  />
                </div>
              </div>
            </div>

            <div className="bottom-0 left-0 w-full border py-4 px-5 flex justify-end">
              <div className="flex items-center gap-3 text-[15px]">
                <button
                  onClick={handleCancel}
                  className="w-20 px-2 py-1 border border-blue-500 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-20 px-2 py-1 text-white border border-blue-500 bg-blue-500 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
