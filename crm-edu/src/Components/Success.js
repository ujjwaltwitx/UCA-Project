import React from "react";
import Lottie from "lottie-react";
import done from "../Assets/Lotties/done.json";

export default function Success() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie animationData={done} className="w-44" />
    </div>
  );
}
