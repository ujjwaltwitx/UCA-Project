import React, { useState } from "react";
import MailList from "./Components/MailList";
import { AnimatePresence, motion } from "framer-motion";
import { sendEmail } from "../../Utils/Api/Api";
import Loader from "../../Components/Loader";
import Success from "../../Components/Success";

export default function Mail() {
  const [toMail, setToMail] = useState([]);
  const [data, setData] = useState({
    subject: "",
    body: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState({
    to: "",
    subject: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDis, setIsDis] = useState(true);
  const [success, setSuccess] = useState(false);

  //? handle modal
  const handleModal = (res) => {
    setShowModal(res);
  };

  //? handle clear
  const handleClear = () => {
    if (toMail.length > 0) setToMail([]);
    setData({ subject: "", body: "" });
    handleModal(false);
  };

  //? handle change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (data.subject.length > 0) setError({ ...error, subject: "" });
    if (data.body.length > 0) setError({ ...error, body: "" });
    if (toMail.length > 0) setError({ ...error, to: "" });

    if (data.subject.length > 0 && data.body.length > 0 && toMail.length > 0) {
      setIsDis(false);
    } else {
      setIsDis(true);
    }
  };

  //? handle send mail
  const handleSend = async () => {
    if (toMail.length === 0) {
      return setError({
        ...error,
        to: "Please enter atleast one email",
      });
    } else {
      setError({
        ...error,
        to: "",
      });
      console.log("error to");
    }

    if (data.subject === "") {
      return setError({
        ...error,
        subject: "Please enter subject",
      });
    } else {
      setError({
        ...error,
        subject: "",
      });
    }

    if (data.body === "") {
      return setError({
        ...error,
        body: "Please enter body",
      });
    } else {
      setError({
        ...error,
        body: "",
      });
    }

    try {
      setLoading(true);
      const res = await sendEmail({
        to: toMail,
        subject: data.subject,
        body: data.body,
      });
      handleClear();
      console.log(res);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col gap-5 overflow-y-auto"
    >
      <div className="relative rounded-xl border shadow-md">
        {/* Head */}
        <div className="px-3 py-1 flex justify-between items-center bg-gray-300 rounded-t-xl">
          <h1>New Message</h1>
          <button
            onClick={() => handleModal(true)}
            className="px-3 py-1 bg-white-og rounded-full hover:shadow-xl transition-all"
          >
            Clear
          </button>
        </div>

        {/* Email Details */}
        <div className="flex flex-col bg-white-og">
          {/* To */}
          <div className="border-b px-3 py-[6px] flex items-center gap-2 flex-wrap">
            <span className={`${error.to && "text-red-500"}`}>To:</span>

            {/* To mails */}
            <div className="flex flex-wrap gap-1">
              {
                // To mails
                toMail.map((mail, index) => (
                  <span
                    key={index}
                    className="border border-gray-300 px-2 py-1 rounded-full text-[13px]"
                  >
                    {mail}
                  </span>
                ))
              }
            </div>
          </div>

          {/* Subject */}
          <input
            type="text"
            name="subject"
            onChange={handleChange}
            value={data.subject}
            autoComplete="off"
            className={`border-b outline-none px-3 py-[6px] text-[15px] ${
              error.subject && "placeholder:text-red-500"
            }`}
            placeholder="Subject"
          />
        </div>

        {/* Body */}
        <div className="">
          <textarea
            cols="30"
            rows="8"
            placeholder="Body"
            name="body"
            value={data.body}
            onChange={handleChange}
            className={`w-full outline-none p-3 text-[15px] -mb-1
              ${error.body && "placeholder:text-red-500"}
            `}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="p-3 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <button
              onClick={handleSend}
              disabled={loading || isDis}
              className={`bg-blue-600 font-medium text-white px-6 py-2 rounded-full
                ${
                  (loading || isDis) &&
                  "cursor-not-allowed opacity-50 bg-gray-500"
                }
              `}
            >
              {loading ? "Sending..." : "Send"}
            </button>
            {/* {error && <span className="text-red-500 text-[13px]">{error}</span>} */}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full bg-black bg-opacity-30 flex justify-center items-center absolute top-0 left-0"
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: -500 }}
                transition={{
                  y: { type: "spring", stiffness: 1000, damping: 100 },
                  duration: 0.2,
                }}
                className=" w-[20rem] overflow-hidden text-center flex flex-col gap-2"
              >
                <div className="bg-white-og bg-opacity-80 rounded-xl shadow-md">
                  <div className="border-b border-gray-300 p-3">
                    <h1 className="text-[15px] font-semibold text-gray-500">
                      You cannot undo this action
                    </h1>
                  </div>
                  <button
                    onClick={handleClear}
                    className="p-3 w-full outline-none text-red-500 text-xl"
                  >
                    Delete all content?
                  </button>
                </div>
                <div className="bg-white-og bg-opacity-90 rounded-xl shadow-md">
                  <button
                    onClick={() => handleModal(false)}
                    className="p-3 w-full text-xl text-blue-600 font-medium outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full bg-black bg-opacity-40 flex justify-center items-center absolute top-0 left-0 backdrop-blur-[2px]"
            >
              <Success />
            </motion.div>
          )}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full bg-black bg-opacity-40 flex justify-center items-center absolute top-0 left-0 backdrop-blur-[2px]"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mail Listing */}
      <MailList toMail={toMail} setToMail={setToMail} />
    </motion.div>
  );
}
