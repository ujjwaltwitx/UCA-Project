import React from "react";

export default function Number({ number, isFilled }) {
  return (
    <div
      style={{
        backgroundColor: isFilled && "green",
      }}
      className="rounded-full w-6 h-6 flex justify-center items-center p-1 text-white bg-blue-500"
    >
      {number}
    </div>
  );
}
