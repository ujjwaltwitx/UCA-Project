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
    schoolName: "",
    schoolYear: "",

    // * Address
    addressStreet: "",
    suburb: "",
    postCode: "",
    parentsEmail: "",

    // * Parent
    //! Parent 1
    parentName: "",
    relation: "",
    parentPhone: "",

    // * Health
    allergicFood: "",
    medications: "",
    allergicMedication: "",
    healthProblem: "",

    // * Subjects
    subjects: [],
    frequency: 0,
    days: [],
    paymentMethod: "",
  });

  const resetForm = form;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const subjectList = ["Maths", "English", "Science", "Arts or painting"];

  const handleAddTimeSlot = () => {
    setTimeSlots((prevSlots) => [
      ...prevSlots,
      {
        day: "",
        startAt: "",
        endAt: "",
      },
    ]);
  };

  const handleUpdateSlot = (e, index, field) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = e.target.value;
    setTimeSlots(updatedTimeSlots);
  };

  const handleRemoveSlot = (index) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots.splice(index, 1);
    setTimeSlots(updatedTimeSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sendingData = {
        ...form,
        timeSlots: timeSlots,
      };

      const response = await sendFormByAdmin(sendingData);
      console.log("response", response);
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

  const handleTimeSlotChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };

  // console.log(form);
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

            <div className="grid grid-cols-3 grid-flow-row-dense gap-4 px-5  pb-4 overflow-y-auto">
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
                    value={form["lastName"]}
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
                  <Field
                    name="School Name"
                    type="text"
                    value={form.schoolName}
                    onChange={(e) => handleChange(e, "schoolName")}
                    loading={loading}
                  />
                  <Field
                    name="School Year"
                    type="number"
                    value={form.schoolYear}
                    onChange={(e) => handleChange(e, "schoolYear")}
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
                  <Field
                    name="Frequency"
                    type="number"
                    value={form.frequency}
                    onChange={(e) => handleChange(e, "frequency")}
                    loading={loading}
                  />

                  {/* TimeSlots */}
                  <div className="flex flex-col gap-1 text-[14px]">
                    <h2 className=" font-semibold">Time Slots</h2>
                    <div className="flex flex-col gap-1 w-[25rem]">
                      {timeSlots.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="text-[15px] px-2 py-1 border border-zinc-400 bg-zinc-100 rounded-md flex justify-between items-center w-full gap-2"
                          >
                            <select
                              name=""
                              id=""
                              disabled={loading}
                              value={item.day}
                              onChange={(e) =>
                                handleUpdateSlot(e, index, "day")
                              }
                              className="w-[max-content] rounded-md outline-none bg-transparent "
                            >
                              <option value="">--select--</option>
                              {weekDays.map((day, index) => {
                                return (
                                  <option key={index} value={day}>
                                    {day}
                                  </option>
                                );
                              })}
                            </select>

                            <div className="flex items-center gap-1">
                              <input
                                type="time"
                                disabled={loading}
                                className="pl-1 bg-transparent outline-none"
                                value={item.startAt}
                                onChange={(e) =>
                                  handleUpdateSlot(e, index, "startAt")
                                }
                              />
                              <input
                                type="time"
                                disabled={loading}
                                className="pl-1 bg-transparent outline-none"
                                value={item.endAt}
                                onChange={(e) =>
                                  handleUpdateSlot(e, index, "endAt")
                                }
                              />
                            </div>

                            <button
                              onClick={() => handleRemoveSlot(index)}
                              disabled={loading}
                              className="text-red-500"
                            >
                              <DeleteIcon className="w-5 h-5" />
                            </button>
                          </div>
                        );
                      })}

                      <div>
                        <button
                          onClick={() => handleAddTimeSlot()}
                          className="text-blue-500"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-[14px]">
                    <h2 className=" font-semibold">Subjects</h2>

                    <div className="flex flex-col gap-1 border border-zinc-400 bg-zinc-100 rounded-md min-w-[20rem] max-w-[22rem] p-3">
                      {subjectList.map((sub, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            disabled={loading}
                            id={sub}
                            checked={form["subjects"].includes(sub)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  subjects: [...prevForm["subjects"], sub],
                                }));
                              } else {
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  subjects: prevForm["subjects"].filter(
                                    (item) => item !== sub
                                  ),
                                }));
                              }
                            }}
                          />
                          <label htmlFor={sub}>{sub}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Field
                    name="Payment Method"
                    type="select"
                    options={["Full Amount", "Ezi-debit /Pay Weekly"]}
                    value={form.paymentMethod}
                    onChange={(e) => handleChange(e, "paymentMethod")}
                    loading={loading}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-3">
                <div className="pb-1 border-b border-zinc-400 flex gap-1 items-center ">
                  <h1 className="text-xl text-blue-600">Address Details</h1>
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
                    name="Suburb"
                    type="text"
                    value={form["suburb"]}
                    onChange={(e) => handleChange(e, "suburb")}
                    loading={loading}
                  />
                  <Field
                    name="PostCode"
                    type="number"
                    value={form.postCode}
                    onChange={(e) => handleChange(e, "postCode")}
                    loading={loading}
                  />
                  <Field
                    name="Parent's Email"
                    type="email"
                    value={form.parentsEmail}
                    onChange={(e) => handleChange(e, "parentsEmail")}
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
                    name="Parent Name"
                    type="text"
                    value={form.parentName}
                    onChange={(e) => handleChange(e, "parentName")}
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
                    name="Phone Number"
                    type="number"
                    value={form.parentPhone}
                    onChange={(e) => handleChange(e, "parentPhone")}
                    loading={loading}
                  />
                </div>
              </div>

              {/* Medical */}
              <div className="flex flex-col gap-3">
                <div className="pb-1 border-b border-zinc-400 flex gap-1 items-center ">
                  <h1 className="text-xl text-blue-600">Medical Information</h1>
                </div>
                <div className="flex flex-col gap-3 ">
                  <Field
                    name="Food Allergy?"
                    type="textarea"
                    value={form.allergicFood}
                    onChange={(e) => handleChange(e, "allergicFood")}
                    loading={loading}
                  />
                  <Field
                    name="On any Medication?"
                    type="textarea"
                    value={form["allergicMedication"]}
                    onChange={(e) => handleChange(e, "allergicMedication")}
                    loading={loading}
                  />
                  <Field
                    name="Allergic to any medication?"
                    type="textarea"
                    value={form.healthProblem}
                    onChange={(e) => handleChange(e, "healthProblem")}
                    loading={loading}
                  />
                  <Field
                    name="Suffering from any health problems?"
                    type="textarea"
                    value={form.medications}
                    onChange={(e) => handleChange(e, "medications")}
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
