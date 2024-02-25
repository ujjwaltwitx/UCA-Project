import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGroups from "../../Utils/hooks/useGroups";
import axios from "axios";
import { BASE_URL } from "../../Utils/constant";

const dataFields = [
  {
    name: "Name",
    fieldName: "name",
    type: "text",
  },
  {
    name: "Salary",
    fieldName: "salary",
    type: "number",
  },
  {
    name: "Groups",
    fieldName: "groups",
    type: "checkbox",
    options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  },
  {
    name: "Address Street",
    fieldName: "addressStreet",
    type: "text",
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
  const [form, setForm] = React.useState({
    name: "",
    salary: "",
    groups: [],
    addressStreet: "",
    pinCode: "",
    phone: "",
    email: "",
    joiningDate: new Date(),
  });

  const { groups, isLoading } = useGroups();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setForm((prev) => ({ ...prev, joiningDate: new Date() }));
      await axios.post(`${BASE_URL}/tutor/save`, form);
      navigate("/dashboard/tutor");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-[28rem] w-full">
      <div className="flex-1 flex flex-col gap-3">
        <div className="pb-1 border-b border-zinc-300 flex gap-1 items-center justify-between">
          <h1 className="text-2xl">Enter details</h1>
          <Link
            to="/dashboard/tutor/"
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
                      {groups?.map((group, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            disabled={loadingForm}
                            id={group?._id}
                            checked={form["groups"].includes(group?._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  groups: [...prevForm["groups"], group?._id],
                                }));
                              } else {
                                setForm((prevForm) => ({
                                  ...prevForm,
                                  groups: prevForm["groups"].filter(
                                    (item) => item?._id !== group?._id
                                  ),
                                }));
                              }
                            }}
                          />
                          <label htmlFor={group?._id}>{group?.name}</label>
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
