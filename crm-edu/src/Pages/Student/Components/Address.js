import React, { useEffect, useState } from "react";
import { updateStudent } from "../../../Utils/Api/Api";
import { EditIcon } from "../../../Components/Icons";

export default function Address({ data, id }) {
  const dataFields = [
    {
      id: 1,
      name: "Address Street",
      fieldName: "addressStreet",
      type: "text",
    },
    {
      id: 3,
      name: "Suburb",
      fieldName: "suburb",
      type: "text",
    },
    {
      id: 2,
      name: "PostCode",
      fieldName: "postCode",
      type: "number",
    },

    {
      id: 6,
      name: "Parent's Email",
      fieldName: "parentsEmail",
      type: "email",
    },
  ];

  const [isEdit, setIsEdit] = useState(false);
  // Form States
  const [loadingForm, setLoadingForm] = useState(false);
  const [statusForm, setStatusForm] = useState({
    status: false,
    message: "",
  });
  const [defaultForm, setDefaultForm] = useState({
    addressStreet: data.addressStreet,
    suburb: data.suburb,
    postCode: data.postCode,
    parentsEmail: data.parentsEmail,
  });
  const [form, setForm] = useState(defaultForm);

  // Form functions
  const handleChange = (e, field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newData = {
      addressStreet: form.addressStreet,
      suburb: form.suburb,
      postCode: form.postCode,
      parentsEmail: form.parentsEmail,
    };
    const sendingData = {
      addressDetail: newData,
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
      setIsEdit(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusForm({
        status: false,
        message: "",
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [statusForm]);

  return (
    <div className="flex flex-wrap gap-x-7 gap-y-12 pr-2 w-full xl:w-[28rem]">
      <div className="flex-1 flex flex-col gap-3">
        <div className="pb-1 border-b border-zinc-300 flex gap-1 items-center justify-between">
          <h1 className="text-2xl">Address Details</h1>
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
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          {dataFields.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-1 text-[14px]">
                <div className="flex items-center justify-between gap-2">
                  <h2 className=" font-semibold">{item.name}</h2>
                  {isEdit && (
                    <h3 className="text-amber-700">
                      {defaultForm[item.fieldName]}
                    </h3>
                  )}
                </div>
                <input
                  type={item.type}
                  disabled={!isEdit || loadingForm}
                  value={form[item.fieldName]}
                  onChange={(e) => handleChange(e, item.fieldName)}
                  className="text-[15px] focus:outline-2 focus:outline-offset-1 focus:outline-blue-600 focus:bg-blue-50  border border-zinc-400 bg-zinc-100 rounded-md w-[28rem] px-2 pt-1 pb-[3px]"
                />
              </div>
            );
          })}

          <button
            type="submit"
            onClick={handleUpdate}
            disabled={!isEdit}
            className="max-w-md py-1 px-2 rounded-md text-white text-[15px] font-semibold bg-green-600 hover:bg-green-500 disabled:pointer-events-none"
          >
            <h1>{loadingForm ? "Saving" : "Save Changes"}</h1>
          </button>
        </form>
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
