import React, { useState } from "react";
import SubjectList from "./SubjectList";
import { useNavigate } from "react-router-dom";
import { CommentIcon, ReloadIcon } from "./Icons";
import Loader from "./Loader";
import CommentBox from "./CommentBox";
import { AnimatePresence } from "framer-motion";

export default function Table({
  modal,
  setModal,
  headings,
  data,
  loading,
  error,
  fetchData,
  setReload,
}) {
  // const [modal, setModal] = useState(false); //? To show the modal of comment
  const [boxData, setBoxData] = useState({});
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/dashboard/student/${id}`);
  };

  const handleModal = (props) => {
    setModal(props);
  };

  const handleComment = (id, comments) => {
    setBoxData({
      id: id,
      comments: comments,
    });
    handleModal(true);
  };

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-left rounded-xl">
        <thead>
          <tr className="bg-gray-200">
            {headings.map((head, index) => (
              <th key={index} className="p-2  rounded-">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            !loading &&
            data.map((row) => (
              <tr
                key={row._id}
                className="hover:bg-green-100 text-[15px] cursor-pointer"
              >
                <td
                  className=" px-2 py-1"
                  onClick={() => handleRowClick(row._id)}
                >
                  {`${row.firstName} ${row.lastName}`}
                </td>
                <td
                  className=" px-2 py-1"
                  onClick={() => handleRowClick(row._id)}
                >
                  {row.addressDetail.parentsEmail}
                </td>
                <td
                  className=" px-2 py-1"
                  onClick={() => handleRowClick(row._id)}
                >
                  {row.parentDetail[0].phone}
                </td>
                <td
                  className=" px-2 py-1"
                  onClick={() => handleRowClick(row._id)}
                >
                  <SubjectList subs={row.tutoringDetail.subjects} />
                </td>
                <td className=" px-2 py-1">
                  {row.status === "Active" && (
                    <span className="text-green-500 rounded-full">
                      {row.status}
                    </span>
                  )}
                  {row.status === "Inactive" && (
                    <span className="text-red-500 rounded-full">
                      {row.status}
                    </span>
                  )}
                  {row.status === "Pending" && (
                    <span className="text-yellow-500 rounded-full">
                      {row.status}
                    </span>
                  )}
                </td>
                <td>
                  <button onClick={() => handleComment(row._id, row.comments)}>
                    <CommentIcon />
                  </button>
                </td>
              </tr>
            ))}
          {
            // ! This is the loading state
            loading && (
              <tr>
                <td colSpan={6} className="text-center p-2">
                  <Loader />
                </td>
              </tr>
            )
          }
          {
            // ! This is the no data state
            !loading && data && data.length === 0 && !error && (
              <tr>
                <td colSpan={6} className="text-center p-2">
                  No Data Found
                </td>
              </tr>
            )
          }

          {
            // ! This is the error state
            error && (
              <tr>
                <td colSpan={6} className="text-center py-3 px-2">
                  <div className=" w-full flex flex-col gap-2 items-center justify-center">
                    <p className="text-red-500 text-xl">{error}</p>
                    <button
                      onClick={fetchData}
                      className="flex gap-1 items-center p-2 bg-gray-200 hover:bg-gray-300 rounded-xl"
                    >
                      <span>Retry</span>
                      <ReloadIcon />
                    </button>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>

      {/* //? This is the comment modal */}
      <AnimatePresence>
        {modal && (
          <CommentBox
            handleModal={handleModal}
            setReload={setReload}
            data={boxData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
