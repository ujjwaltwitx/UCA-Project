import React from "react";

export default function ErrorModal({ error }) {
  return (
    <div className="">
      <div>
        <p>{error}</p>
      </div>
    </div>
  );
}
