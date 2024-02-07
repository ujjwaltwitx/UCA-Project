import React, { useState } from "react";
import { updateStudent } from "../../../Utils/Api/Api";
import { DeleteIcon, EditIcon } from "../../../Components/Icons";

export default function Academic({ data, id }) {
  const [isEdit, setIsEdit] = useState(false);
  const [defaultForm, setDefaultForm] = useState(data);
  const [form, setForm] = useState(data);
  const [timeSlots, setTimeSlots] = useState(data.timeSlots);
  const [loadingForm, setLoadingForm] = useState(false);
  const [statusForm, setStatusForm] = useState({
    status: false,
    message: "",
  });

  // Constants for arrays
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
  const paymentList = ["Full Amount", "Ezi-debit /Pay Weekly"];

  // Time slot functions
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

  const handleChange = (e, field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      days: form.days,
      subjects: form.subjects,
      paymentMethod: form.paymentMethod,
      timeSlots: timeSlots,
      frequency: form.frequency,
    };
    const sendingData = {
      tutoringDetail: newData,
    };
    setLoadingForm(true);
    setStatusForm({
      status: false,
      message: "",
    });
    try {
      const response = await updateStudent(id, sendingData);
      console.log(response);
      setDefaultForm(newData);
      setStatusForm({
        status: true,
        message: response,
      });
      setIsEdit(false);
      setLoadingForm(false);
    } catch (error) {
      console.log(error);
      setStatusForm({
        status: false,
        message: error.message,
      });
      setLoadingForm(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      setForm(defaultForm);
      setTimeSlots(defaultForm.timeSlots);
      setIsEdit(false);
    } else {
      return;
    }
  };

  // console.log(form);

  return (
    <div className="flex flex-wrap gap-x-7 gap-y-12 pr-2 w-full xl:w-[35rem]">
      <div className="flex-1 flex flex-col gap-3">
        <div className="pb-1 border-b border-zinc-300 flex gap-1 items-center justify-between">
          <h1 className="text-2xl">Academic Profile</h1>
          {isEdit ? (
            <button
              onClick={handleCancel}
              className="px-2 py-1 rounded-md bg-red-500 text-white text-sm font-medium"
            >
              Cancel
            </button>
          ) : (
            <button onClick={() => setIsEdit(true)}>
              <EditIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {/* Fields here */}
          <div className="flex flex-col gap-1 text-[14px]">
            <div className="flex items-center justify-between gap-2">
              <h2 className=" font-semibold">
                Frequency
                <span className="text-gray-600 text-[13px] ml-1">
                  (Per week)
                </span>
              </h2>
              {isEdit && (
                <h3 className="text-amber-700">{defaultForm["frequency"]}</h3>
              )}
            </div>
            <input
              type="number"
              disabled={!isEdit || loadingForm}
              value={form["frequency"]}
              onChange={(e) => handleChange(e, "frequency")}
              className="text-[15px] focus:outline-2 focus:outline-offset-1 focus:outline-blue-600 focus:bg-blue-50  border border-zinc-400 bg-zinc-100 rounded-md w-[28rem] px-2 pt-1 pb-[3px]"
            />
          </div>

          {/* Time Slot Field */}
          <div className="flex flex-col gap-1 text-[14px]">
            <div className="flex items-center justify-between gap-2">
              <h2 className=" font-semibold">Time Slots</h2>
              {isEdit && <h3 className="text-amber-700"></h3>}
            </div>
            <div className="flex flex-col gap-1 w-[28rem]">
              {timeSlots.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-[15px] px-2 py-1 border border-zinc-400 bg-zinc-100 rounded-md flex justify-between items-center w-full gap-2"
                  >
                    <select
                      name=""
                      id=""
                      disabled={!isEdit || loadingForm}
                      value={item.day}
                      onChange={(e) => handleUpdateSlot(e, index, "day")}
                      className="w-[max-content] rounded-md outline-none bg-transparent "
                    >
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
                        disabled={!isEdit || loadingForm}
                        className="pl-1 bg-transparent outline-none"
                        value={item.startAt}
                        onChange={(e) => handleUpdateSlot(e, index, "startAt")}
                      />
                      <input
                        type="time"
                        disabled={!isEdit || loadingForm}
                        className="pl-1 bg-transparent outline-none"
                        value={item.endAt}
                        onChange={(e) => handleUpdateSlot(e, index, "endAt")}
                      />
                    </div>

                    <button
                      onClick={() => handleRemoveSlot(index)}
                      disabled={!isEdit || loadingForm}
                      className="text-red-500"
                    >
                      <DeleteIcon className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
              {isEdit && (
                <div>
                  <button
                    onClick={() => handleAddTimeSlot()}
                    className="text-blue-500"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Subject Fields */}
          <div className="flex flex-col gap-1 text-[14px]">
            <div className="flex items-center justify-between gap-2">
              <h2 className=" font-semibold">Subjects</h2>
              {isEdit && (
                <h3 className="text-amber-700">
                  {defaultForm["subjects"].map((item) => {
                    return item + " ";
                  })}
                </h3>
              )}
            </div>
            <div className="flex flex-col gap-1 border border-zinc-400 bg-zinc-100 rounded-md w-[28rem] p-3">
              {subjectList.map((sub, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    disabled={!isEdit || loadingForm}
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

          {/* Payment Methods */}
          <div className="flex flex-col gap-1 text-[14px]">
            <div className="flex items-center justify-between gap-2">
              <h2 className=" font-semibold">Payment Method</h2>
              {isEdit && (
                <h3 className="text-amber-700">
                  {defaultForm["paymentMethod"]}
                </h3>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <select
                name=""
                id=""
                disabled={!isEdit || loadingForm}
                value={form["paymentMethod"]}
                onChange={(e) => handleChange(e, "paymentMethod")}
                className="outline-none w-[28rem] text-[15px] focus:border-none focus:outline-2 focus:outline-offset-1 focus:outline-blue-600 focus:bg-blue-50 bg-zinc-100 border border-zinc-400 disabled:border-zinc-500 rounded-md px-2 py-1"
              >
                {paymentList.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleUpdate}
            disabled={!isEdit || loadingForm}
            className="max-w-md py-1 px-2 rounded-md text-white text-[15px] font-semibold bg-green-600 hover:bg-green-500 disabled:pointer-events-none"
          >
            <h1>{loadingForm ? "Saving..." : "Save Changes"}</h1>
          </button>
        </div>
        {statusForm.message && statusForm.status === true ? (
          <div className="text-green-600 text-sm font-semibold">
            {statusForm.message}
          </div>
        ) : (
          <div className="text-red-600 text-sm font-semibold">
            {statusForm.message}
          </div>
        )}
      </div>
    </div>
  );
}
