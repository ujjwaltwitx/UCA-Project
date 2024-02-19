import React from "react";
import { Link } from "react-router-dom";

const dataFields = [
  {
    name: "First Name",
    fieldName: "firstName",
    type: "text",
  },
  {
    name: "Last Name",
    fieldName: "lastName",
    type: "text",
  },
  {
    name: "Date of birth",
    fieldName: "dob",
    type: "date",
  },
  {
    name: "Gender",
    fieldName: "gender",
    type: "select",
    options: ["Male", "Female", "Others"],
  },
  {
    name: "Pin Code",
    fieldName: "pinCode",
    type: "number",
  },
  {
    name: "Phone",
    fieldName: "phone",
    type: "number",
  },
  {
    name: "Email",
    fieldName: "email",
    type: "email",
  },
];
export default function AddTutor() {
  const [loadingForm, setLoadingForm] = React.useState(false);
  const [subjects, setSubjects] = React.useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);
  const [form, setForm] = React.useState({
    name: "",
    salary: "",
    subjects: [],
    addressStreet: "",
    pinCode: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  console.log(form);

  return (
    <div className="max-w-[28rem] w-full">
      <div className="flex-1 flex flex-col gap-3">
        <div className="pb-1 border-b border-zinc-300 flex gap-1 items-center justify-between">
          <h1 className="text-2xl">Enter details</h1>
          <Link
            to="/dashboard/students/"
            className="text-sm text-red-500 font-medium"
          >
            Cancel
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {dataFields &&
            dataFields?.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-1 text-[14px]">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className=" font-semibold">{item?.name}</h2>
                  </div>
                  {item.type === "select" ? (
                    <div className="flex flex-col gap-3">
                      <select
                        onChange={handleChange}
                        value={form[item.fieldName]}
                        disabled={loadingForm}
                        name={item.fieldName}
                        className="outline-none w-[28rem] bg-zinc-100 border border-zinc-400  rounded-md px-2 py-1"
                      >
                        {item?.options.map((option) => {
                          return (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    item.type !== "checkbox" && (
                      <input
                        type={item.type}
                        disabled={loadingForm}
                        value={form[item.fieldName]}
                        name={item.fieldName}
                        onChange={handleChange}
                        className="text-[15px] focus:outline-2 focus:outline-offset-1 focus:outline-blue-600 focus:bg-blue-50  border border-zinc-400 bg-zinc-100 rounded-md w-[28rem] px-2 pt-1 pb-[3px]"
                      />
                    )
                  )}
                  {item.type === "checkbox" && (
                    <div className="grid grid-cols-3 gap-2 border border-zinc-400 bg-zinc-100 rounded-md p-3">
                      {subjects?.map((sub, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            disabled={loadingForm}
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
                  )}
                </div>
              );
            })}

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
    </div>
  );
}
