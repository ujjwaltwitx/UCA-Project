import React from "react";
import Lottie from "lottie-react";
import loadingPlane from "../Assets/Lotties/loadingPlane.json";

export default function LoaderGlobal() {
  return (
    <div className="fixed w-screen h-screen flex justify-center items-center">
      <Lottie animationData={loadingPlane} className="w-64" />
    </div>
  );
}
