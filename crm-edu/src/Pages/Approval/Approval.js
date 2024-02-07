import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DeleteIcon, EditIcon, TickIcon } from "../../Components/Icons";
import { getStudents } from "../../Utils/Api/Api";
import Loader from "../../Components/Loader";
import Modal from "./Components/Modal";

export default function Approval() {
  const headings = ["Name", "Parent Email", "Phone No", "Actions"];
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [currId, setCurrId] = useState(null); //? To store the id of the student to be deleted or edited
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNo, setPageNo] = useState(0);

  const handlePrev = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleDelete = (id) => {
    const newData = data.filter((d) => d._id !== id);
    setData(newData);
  };

  const handleEdit = (id) => {
    setModal(true);
    setCurrId(id);
  };

  //! Data fetching
  const getData = async () => {
    setLoading(true);
    try {
      const data = await getStudents({ approved: false }, pageNo);
      const filterData = data.filter((row) => row.approved === false);
      setData(filterData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [modal, pageNo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-5 w-full h-full overflow-hidden relative"
    >
      <div className="overflow-x-auto rounded-xl border min-h-[36.8rem]">
        <table className="w-full text-left rounded-xl table-auto ">
          <thead>
            <tr className="bg-gray-200">
              {headings.map((head, index) =>
                head === "Actions" ? (
                  <th key={index} className="p-2 w-1/6">
                    {head}
                  </th>
                ) : (
                  <th key={index} className="p-2 w-">
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {data &&
              !loading &&
              data.map((row) => (
                <tr key={row._id} className="text-[15px]">
                  <td className=" px-2 py-1">{`${row.firstName} ${row.lastName}`}</td>
                  <td className=" px-2 py-1">
                    {row.addressDetail ? row.addressDetail.parentsEmail : "N/A"}
                  </td>
                  <td className=" px-2 py-1">{row.parentDetail[0].phone}</td>
                  <td className=" px-2 py-1">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(row._id)}
                        className="px-[4px] rounded-full hover:bg-blue-400 transition-all ease-in-out"
                      >
                        <EditIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-1 rounded-full hover:bg-red-400 transition-all ease-in-out"
                      >
                        <DeleteIcon className="w-5 h-5 " />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {
              // ! This is the loading state
              loading && (
                <tr>
                  <td colSpan={5} className="text-center p-2">
                    <Loader />
                  </td>
                </tr>
              )
            }
            {
              // ! This is the no data state
              !loading && data && data.length === 0 && !error && (
                <tr>
                  <td colSpan={5} className="text-center p-2">
                    No Data Found
                  </td>
                </tr>
              )
            }
            {
              // ! This is the error state
              error && (
                <tr>
                  <td colSpan={5} className="text-center py-3 px-2">
                    <div className=" w-full flex flex-col gap-2 items-center justify-center">
                      <p className="text-red-500 text-xl">{error}</p>
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 justify-between items-center">
        <div>
          <button
            onClick={handlePrev}
            disabled={pageNo === 0}
            className="px-2 py-1 text-sm text-black-1 rounded-md bg-black bg-opacity-10 disabled:opacity-50"
          >
            Prev
          </button>
        </div>

        <div>
          <button
            onClick={handleNext}
            disabled={data && data.length < 10}
            className="px-2 py-1 text-sm text-black-1 rounded-md bg-black bg-opacity-10 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        <Modal open={modal} id={currId} handleModal={handleModal} />
      </AnimatePresence>
    </motion.div>
  );
}
