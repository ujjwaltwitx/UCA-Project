import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { storage } from "../../Utils/Firebase/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { CloudUploadIcon, DeleteIcon } from "../../Components/Icons";

export default function Gallery() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState([]); // idle, uploading, done, error
  const [uploadProgress, setUploadProgress] = useState([]); // [0, 0, 0, 0, 0]

  // Drag & Drop Function
  const handleDrop = (e) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // DragOver
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Browse files
  const handleInputFiles = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Files Validation
  const handleFiles = (files) => {
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    setSelectedFiles([...selectedFiles, ...validFiles]);
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  // Handle Uploading to firebase
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const checkFiles = selectedFiles.filter(
      (file) => uploadStatus[file.name] !== "done"
    );

    if (checkFiles.length === 0) return;
    setSelectedFiles(checkFiles);

    selectedFiles.forEach(async (file) => {
      const storageRef = ref(storage, `gallery/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadStatus((prev) => ({
            ...prev,
            [file.name]: "uploading",
          }));
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress.toFixed(0),
          }));
        },
        (error) => {
          setUploadStatus((prev) => ({
            ...prev,
            [file.name]: "error",
          }));
        },
        () => {
          setUploadStatus((prev) => ({
            ...prev,
            [file.name]: "done",
          }));
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: 100,
          }));
        }
      );
    });
  };

  useEffect(() => {
    //Remove the done files after 2 seconds
    const timer = setTimeout(() => {
      const newFiles = selectedFiles.filter(
        (file) => uploadStatus[file.name] !== "done"
      );
      if (newFiles.length > 0) {
        setSelectedFiles(newFiles);
        setUploadStatus([]);
        setUploadProgress([]);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [uploadStatus, selectedFiles]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-8 w-full h-full relative"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[40rem] flex flex-col gap-3">
          {/* Drag & drop */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className=" border border-dashed border-zinc-400 p-4 rounded-md bg-sky-100 hover:bg-sky-200 transition-all ease-linear flex flex-col items-center justify-center gap-5"
          >
            <div className="flex flex-col gap-2 items-center">
              <CloudUploadIcon className="w-16 h-16" />
              <p>
                Drag & drop files or{" "}
                <label className="text-blue-600 font-medium underline cursor-pointer">
                  Browse
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleInputFiles}
                  />
                </label>
              </p>
              <p className="text-zinc-500 text-sm">
                Supported file: images and videos.
              </p>
            </div>
          </div>

          {/* Data */}
          {selectedFiles.length > 0 && (
            <div className="w-full flex flex-col gap-2">
              <p className="font-semibold text-zinc-700">Selected Files:</p>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li
                    key={index}
                    className={`relative py-1 px-2 my-1 text-[14px] rounded-md border flex items-center justify-between gap-2
                      ${uploadStatus[file.name] === "error" && "border-red-600"}
                      ${
                        uploadStatus[file.name] === "done" && "border-green-600"
                      }
                      ${
                        uploadStatus[file.name] === "uploading" &&
                        "border-amber-600"
                      }
                      ${!uploadStatus[file.name] && "border-yellow-500"}
                    `}
                  >
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(index)}
                      className="hover:scale-105"
                    >
                      <DeleteIcon className="w-5 h-5" color="red" />
                    </button>

                    {/* Progress Bar */}
                    <div className="absolute left-[102%] flex gap-4 items-center">
                      {!uploadStatus[file.name] && (
                        <p className="text-yellow-500 font-semibold">Idle</p>
                      )}
                      {uploadStatus[file.name] === "error" && (
                        <p className="text-red-600 font-semibold">Error</p>
                      )}
                      {uploadStatus[file.name] === "uploading" && (
                        // Animate bar
                        <div className="w-20 h-2 bg-amber-600 rounded-md animate-pulse"></div>
                      )}

                      {uploadStatus[file.name] === "done" && (
                        <p className="text-green-600 font-semibold">Done</p>
                      )}
                      {uploadProgress[file.name] && (
                        <p className="text-amber-600 font-semibold">
                          {uploadProgress[file.name]}%
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedFiles.length > 0 && (
            <div className="w-full flex justify-between gap-2">
              <button
                onClick={() => setSelectedFiles([])}
                className="flex-1 border border-sky-600 text-sky-600 hover:bg-sky-100 font-semibold py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="flex-1 border border-sky-600 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-md"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-5 p-5 bg-amber-200 text-amber-700 text-[15px]">
        <p>
          For managing files, please use the{" "}
          <a
            href="https://console.firebase.google.com/u/0/project/tutorincentre/storage/tutorincentre.appspot.com/files"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 font-semibold underline cursor-pointer"
          >
            Firebase Console Storage
          </a>
          .
        </p>
        {/* Instuctions */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Instructions for managing files:</p>
          <ul className="list-disc list-inside">
            <li className="text-amber-700 text-[15px]">
              Click on the link above.
            </li>
            <li className="text-amber-700 text-[15px]">
              Website's files are stored in the folder <b>gallery</b>.
            </li>
            <li className="text-amber-700 text-[15px]">
              You can upload, download, and delete files.
            </li>
          </ul>
        </div>

        <div>
          <p>
            Kindly keep the file size small. It will help the website to load
            faster.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
