import React, { useState } from "react";
import { motion } from "framer-motion";
import TableCommon from "../../Components/TableCommon";

const headings = ["Name", "Email", "Phone"];
export default function AllTutors() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    setLoading(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-5 w-full h-full relative"
    >
      <div className="flex flex-col gap-3">
        <TableCommon
          headings={headings}
          data={[
            {
              name: "John Doe",
              email: "abc@gmail.com",
              phone: "1234567890",
            },
          ]}
          error={error}
        />
      </div>
    </motion.div>
  );
}
