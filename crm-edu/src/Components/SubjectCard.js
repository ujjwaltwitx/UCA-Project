import React from "react";

export default function SubjectCard({ data }) {
  return (
    <div className=" bg-blue-500 text-white rounded-2xl p-5 flex flex-col gap-5 overflow-hidden">
      <div className="flex gap-2 items-center">
        <h3 className="text-2xl capitalize font-bold">{data}</h3>
        <div className="w-full h-[2px] rounded-full bg-white"></div>
      </div>
    </div>
  );
}
