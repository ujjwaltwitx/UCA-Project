import React from "react";

export default function Field({
  options,
  value,
  onChange,
  loading,
  type,
  name,
}) {
  if (type === "select") {
    return (
      <div className="flex flex-col gap-1 text-[14px]">
        <div className="flex items-center justify-between gap-2">
          <h2 className=" font-semibold">{name}</h2>
        </div>
        <div className="flex flex-col gap-3">
          <select
            onChange={onChange}
            value={value}
            disabled={loading}
            className="outline-none  min-w-[20rem] max-w-[22rem] bg-zinc-100 border border-zinc-400  rounded-md px-2 py-1"
          >
            <option value=""> -- select an option -- </option>
            {options.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-1 text-[14px]">
        <div className="flex items-center justify-between gap-2">
          <h2 className=" font-semibold">{name}</h2>
        </div>
        {type === "textarea" ? (
          <textarea
            disabled={loading}
            value={value}
            cols={30}
            rows={2}
            onChange={onChange}
            className="text-[15px] focus:outline-2 focus:outline-offset-1 focus:outline-blue-600 focus:bg-blue-50  border border-zinc-400 bg-zinc-100 rounded-md min-w-[20rem] max-w-[22rem] px-2 pt-1 pb-[3px]"
          ></textarea>
        ) : (
          <input
            type={type}
            disabled={loading}
            value={value}
            onChange={onChange}
            className="text-[15px] focus:outline-1 focus:outline-offset-2 focus:outline-blue-600 focus:bg-blue-50  border border-zinc-400 bg-zinc-100 rounded-md min-w-[20rem] max-w-[22rem] px-2 pt-1 pb-[3px]"
          />
        )}
      </div>
    );
  }
}
