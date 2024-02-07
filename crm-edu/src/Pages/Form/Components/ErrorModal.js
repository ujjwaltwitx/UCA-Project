import React from "react";
import { motion } from "framer-motion";

export default function ErrorModal({ message }) {
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: 1000 }}
      transition={{ type: "spring" }}
      className="fixed top-20 right-0"
    >
      <div className="text-white-og text-sm px-4 py-2 rounded-md bg-red-500">
        {message}
      </div>
    </motion.div>
  );
}
